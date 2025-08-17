import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from "virtual:pwa-register";

// 🔹 Setup React Query client
const queryClient = new QueryClient();

// 🔹 Register Service Worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New update available. Reload now?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline!");
  },
});

// 🔹 Handle Online/Offline events
window.addEventListener("offline", () => {
  console.log("⚠️ You are offline!");
});

window.addEventListener("online", () => {
  console.log("✅ You are back online!");
});

// 🔹 Clerk environment key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) throw new Error("VITE_CLERK_PUBLISHABLE_KEY is missing");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
