"use client";

import { useState } from "react";
import ServiceForm from "./ServiceForm";

export default function ProfileForm() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  // SVG Progress Circle Component
  function ProgressCircle({ percent }: { percent: number }) {
    const radius = 32;
    const stroke = 6;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percent / 100) * circumference;
    return (
      <svg height={radius * 2} width={radius * 2} className="block mx-auto">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#22c55e"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="1.1rem"
          fill="#111827"
          fontWeight="bold"
        >
          {percent}%
        </text>
      </svg>
    );
  }

  const providerData: Record<string, string | number> = {
    registration_id: 1001,
    full_name: "Jane Smith",
    business_name: "CleanPro Services",
    nid_number: "1234567890",
    business_license: "BL-2023-001",
    govt_id_or_tin: "TIN-987654321",
    facebook_profile: "https://facebook.com/cleanpro",
    website_link: "https://cleanpro.com",
    area_name: "Downtown",
    postal_code: "54321",
    phone_number: "+1 (555) 987-6543",
    category: "Cleaning",
    email: "contact@cleanpro.com",
    password_hash: "********",
    status: "Active",
    submitted_at: "2024-06-01T10:00:00Z",
    reviewed_at: "2024-06-02T15:00:00Z",
    reviewer_id: 2002,
    avatar: "🏢",
  };

  //   const managedServices = [
  //     {
  //       id: 1,
  //       service: "Home Cleaning",
  //       status: "Active",
  //       bookings: 120,
  //       rating: 4.8,
  //     },
  //     {
  //       id: 2,
  //       service: "Office Cleaning",
  //       status: "Active",
  //       bookings: 80,
  //       rating: 4.7,
  //     },
  //     {
  //       id: 3,
  //       service: "Event Services",
  //       status: "Inactive",
  //       bookings: 15,
  //       rating: 4.5,
  //     },
  //   ];

  // Calculate completion percentage
  const completedCount = Object.keys(providerData).filter(
    (key) => providerData[key] && providerData[key].toString().trim() !== ""
  ).length;
  const completionPercent = Math.round(
    (completedCount / Object.keys(providerData).length) * 100
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8 flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0">
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-0 sm:mr-6">
            {providerData.avatar}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
              {providerData.business_name}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Service Provider
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Owner: {providerData.full_name}
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                providerData.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {providerData.status}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center md:ml-4 mt-4 md:mt-0 w-full md:w-auto">
          <ProgressCircle percent={completionPercent} />
          <span className="mt-2 text-xs text-gray-500">Profile Completion</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("edit")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "edit"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab("serviceDetails")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "serviceDetails"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Service Details
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
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
          {activeTab === "overview" && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Provider Overview
              </h2>
              {/* Service Details Card/List (was in Service Details tab) */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
                <div>
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-2xl mb-2">
                    {providerData.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-green-700">
                      {providerData.business_name}
                    </span>
                    <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-semibold">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-500 text-xs font-semibold mb-1">
                    <span>★★★★☆</span>
                    <span className="text-gray-800 ml-1">4.8</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-2">
                    <span className="bg-green-50 px-2 py-0.5 rounded">
                      {providerData.area_name}
                    </span>
                    <span className="bg-green-50 px-2 py-0.5 rounded">
                      5+ years exp
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === "edit" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Profile
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {isEditing ? "Save Changes" : "Edit Info"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Registration ID (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration ID
                  </label>
                  <input
                    type="text"
                    value={providerData.registration_id}
                    disabled
                    className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-50"
                  />
                </div>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.full_name}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.business_name}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* NID Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NID Number
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.nid_number}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Business License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business License
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.business_license}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Govt ID or TIN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Govt ID or TIN
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.govt_id_or_tin}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Facebook Profile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook Profile
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.facebook_profile}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Website Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website Link
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.website_link}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Area Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area Name
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.area_name}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.postal_code}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.phone_number}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    defaultValue={providerData.category}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={providerData.email}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Password Hash */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Hash
                  </label>
                  <input
                    type="password"
                    defaultValue={providerData.password_hash}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {/* Status (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <input
                    type="text"
                    value={providerData.status}
                    disabled
                    className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-50"
                  />
                </div>
                {/* Submitted At */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Submitted At
                  </label>
                  <span className="block text-base text-gray-900">
                    {typeof providerData.submitted_at === "string"
                      ? providerData.submitted_at
                          .replace("T", " ")
                          .replace("Z", "")
                      : providerData.submitted_at}
                  </span>
                </div>
                {/* Reviewed At (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reviewed At
                  </label>
                  <span className="block text-base text-gray-900">
                    {typeof providerData.reviewed_at === "string"
                      ? providerData.reviewed_at
                          .replace("T", " ")
                          .replace("Z", "")
                      : providerData.reviewed_at}
                  </span>
                </div>
                {/* Reviewer ID (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reviewer ID
                  </label>
                  <input
                    type="text"
                    value={providerData.reviewer_id}
                    disabled
                    className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "serviceDetails" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Service Details (Edit)
              </h2>
              {/* Service Details Form (was in Overview) */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-green-700 mb-4">
                  Add or Edit Your Services (max 5)
                </h3>
                <ServiceForm />
              </div>
            </div>
          )}

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
    </>
  );
}
