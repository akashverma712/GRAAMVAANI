const express = require("express");
const User = require("../models/userModel");
const { clerkClient } = require("@clerk/clerk-sdk-node");

const router = express.Router();

// 📌 Get Users + Chart Data + Local Admins by City
router.get("/users-data", async (req, res) => {
  console.log("📌 [INFO] /users-data route hit");

  try {
    // 1️⃣ Fetch MongoDB Users
    const mongoUsers = await User.find({});
    console.log(`✅ MongoDB returned ${mongoUsers.length} users`);

    const clerkIds = mongoUsers.map(u => u.clerkId).filter(Boolean);

    // 2️⃣ Fetch Clerk Users (for normal users list)
    let clerkUsers = [];
    if (clerkIds.length) {
      try {
        clerkUsers = await clerkClient.users.getUserList({ userId: clerkIds });
        console.log(`✅ Clerk returned ${clerkUsers.length} users`);
      } catch (clerkError) {
        console.error("❌ Clerk fetch error:", clerkError.message);
        return res.status(500).json({
          message: "Error fetching data from Clerk",
          error: clerkError.message || clerkError
        });
      }
    }

    // 3️⃣ Merge MongoDB + Clerk Data for All Users
    const merged = mongoUsers.map(mongoUser => {
      const clerkUser = clerkUsers.find(cu => cu.id === mongoUser.clerkId);

      return {
        id: mongoUser._id, // ✅ for deletion
        clerkId: mongoUser.clerkId,
        name: clerkUser
          ? `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim()
          : mongoUser.name || "Unknown User",
        email:
          clerkUser?.emailAddresses?.[0]?.emailAddress ||
          mongoUser.email ||
          "N/A",
        phone: mongoUser.phone || "N/A",
        district: mongoUser.district || "N/A",
        pincode: mongoUser.pincode || "N/A",
        state: mongoUser.state || "N/A",
        panchayat: mongoUser.panchayat || "N/A",
        role: clerkUser?.publicMetadata?.role || "user", // ✅ Role from Clerk
        city: clerkUser?.publicMetadata?.district || "N/A" // ✅ City from Clerk metadata
      };
    });

    // 📊 Prepare chart data for All Users
    const districtCount = {};
    merged.forEach(user => {
      const dist = user.district || "Unknown";
      districtCount[dist] = (districtCount[dist] || 0) + 1;
    });

    const chartData = Object.entries(districtCount).map(
      ([district, count]) => ({ district, count })
    );

    // 4️⃣ Fetch ALL Local Admins directly from Clerk (not from Mongo)
    let localAdminsClerk = [];
    try {
      const allClerkUsers = await clerkClient.users.getUserList({ limit: 500 });
      localAdminsClerk = allClerkUsers.filter(
        u => u.publicMetadata?.role === "local-admin"
      );
      console.log(`✅ Clerk returned ${localAdminsClerk.length} local admins`);
    } catch (err) {
      console.error("❌ Error fetching local admins from Clerk:", err.message);
    }

    // 5️⃣ Group Local Admins by District
    const localAdminsByCity = {};
    localAdminsClerk.forEach(admin => {
      const district = admin.publicMetadata?.city || "Unknown";
      if (!localAdminsByCity[district]) {
        localAdminsByCity[district] = [];
      }
      localAdminsByCity[district].push({
        id: admin.id,
        name: `${admin.firstName || ""} ${admin.lastName || ""}`.trim(),
        email: admin.emailAddresses?.[0]?.emailAddress || "N/A",
        role: admin.publicMetadata?.role || "local-admin",
        district
      });
    });

    res.json({
      chartData,
      users: merged,
      localAdminsByCity
    });

  } catch (error) {
    console.error("❌ Error in /users-data:", error.message);
    res.status(500).json({
      message: "Server error while fetching users data",
      error: error.message || error
    });
  }
});

// 🗑 Delete User (MongoDB + Clerk)
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Delete from Clerk
    if (user.clerkId) {
      try {
        await clerkClient.users.deleteUser(user.clerkId);
      } catch (clerkErr) {
        console.warn("⚠️ Clerk deletion failed:", clerkErr.message);
      }
    }

    // Delete from MongoDB
    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// 🗑 Delete Local Admin (Clerk only)
router.delete("/delete-local-admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete from Clerk only
    await clerkClient.users.deleteUser(id);

    res.json({ message: "Local Admin deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting local admin:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
