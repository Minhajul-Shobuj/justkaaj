"use client";
import { useState } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/Shared/Footer";
import Header from "@/Component/Profile/Header";
import OverView from "@/Component/Profile/OverView";
import Profile from "@/Component/Profile/Profile";
import Services from "@/Component/Profile/Services";
import { Order } from "@/Component/Profile/Order";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <Header />
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto px-4 sm:px-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "overview"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "profile"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "services"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Service History
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "orders"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "settings"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && <OverView />}
              {/* profiel tab */}
              {activeTab === "profile" && <Profile />}
              {/* service tab */}
              {activeTab === "services" && <Services />}
              {/* order tab */}
              {activeTab === "orders" && <Order />}
              {/* setting tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          />
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Notification Preferences
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Email notifications
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            SMS notifications
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Marketing emails
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
