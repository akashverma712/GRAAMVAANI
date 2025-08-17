const express = require("express");
const router = express.Router();
const { getUsersByDistrict } = require("../controllers/adminController");

// GET all users by district
router.get("/users/:district", getUsersByDistrict);

module.exports = router;
