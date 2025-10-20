"use client";
import { useState } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/Shared/Footer";
import React from "react";
import ProfileForm from "@/Component/Profile/provider/ProfileForm";

const mockServiceRequests = [
  {
    id: 1,
    customerName: "Ahmed Khan",
    customerPhone: "+880 1712-345678",
    customerEmail: "ahmed.khan@email.com",
    serviceName: "Home Cleaning",
    date: "2024-01-15",
    time: "10:00 AM",
    address: "House #123, Road #5, Dhanmondi, Dhaka",
    status: "ongoing",
    price: 1500,
    description: "Full house cleaning including kitchen and bathrooms",
    chat: [
      {
        sender: "customer",
        message: "Hi, when will you arrive?",
        time: "09:30 AM",
      },
      {
        sender: "provider",
        message: "I'll be there in 15 minutes",
        time: "09:32 AM",
      },
      {
        sender: "provider",
        message: "I'm on my way, traffic is a bit heavy",
        time: "09:45 AM",
      },
    ],
  },
  {
    id: 2,
    customerName: "Fatima Rahman",
    customerPhone: "+880 1812-345679",
    customerEmail: "fatima.rahman@email.com",
    serviceName: "Car Wash",
    date: "2024-01-14",
    time: "2:00 PM",
    address: "Parking Lot, Bashundhara City, Dhaka",
    status: "completed",
    price: 800,
    description: "Exterior and interior car cleaning",
    chat: [
      {
        sender: "customer",
        message: "Service completed successfully",
        time: "3:30 PM",
      },
      {
        sender: "provider",
        message: "Thank you! Please rate our service",
        time: "3:32 PM",
      },
    ],
  },
  {
    id: 3,
    customerName: "Rahim Ali",
    customerPhone: "+880 1912-345680",
    customerEmail: "rahim.ali@email.com",
    serviceName: "Plumbing",
    date: "2024-01-16",
    time: "11:00 AM",
    address: "Apartment #5B, Gulshan-2, Dhaka",
    status: "pending",
    price: 2000,
    description: "Fix leaking kitchen faucet",
    chat: [],
  },
];

export default function ProviderProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

  const providerData = {
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

  // List of editable fields for completion calculation
  const editableFields = [
    "full_name",
    "business_name",
    "nid_number",
    "business_license",
    "govt_id_or_tin",
    "facebook_profile",
    "website_link",
    "area_name",
    "postal_code",
    "phone_number",
    "category",
    "email",
    "password_hash",
    "submitted_at",
  ];

  // Calculate completion percentage
  const completedCount = editableFields.filter(
    (field) =>
      (providerData as Record<string, string | number>)[field] &&
      (providerData as Record<string, string | number>)[field]
        .toString()
        .trim() !== ""
  ).length;
  const completionPercent = Math.round(
    (completedCount / editableFields.length) * 100
  );

  const handleStatusUpdate = (serviceId: number, newStatus: string) => {
    // In real app, this would update the database
    console.log(`Service ${serviceId} status updated to ${newStatus}`);
  };

  const sendMessage = (serviceId: number) => {
    if (newMessage.trim()) {
      // In real app, this would send to backend
      console.log(`Sending message to service ${serviceId}: ${newMessage}`);
      setNewMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-green-100">
            {/* Header */}
            <div className="border-b border-green-100 px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Service Provider Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your services and customer interactions
              </p>
            </div>
            {/* Tabs */}
            <div className="border-b border-green-100">
              <nav className="flex overflow-x-auto px-4 sm:px-6">
                {[
                  { id: "profile", name: "Profile" },
                  { id: "manage", name: "Manage Services" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "profile" && <ProfileForm />}
              {activeTab === "manage" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Service Requests
                    </h2>
                    <div className="flex space-x-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-md text-gray-900">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {mockServiceRequests.map((service: any) => (
                      <div
                        key={service.id}
                        className="bg-white border border-green-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {service.serviceName}
                            </h3>
                            <p className="text-gray-600">
                              {service.customerName} • {service.date} at{" "}
                              {service.time}
                            </p>
                            <p className="text-green-600 font-medium">
                              ৳{service.price}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                service.status
                              )}`}
                            >
                              {service.status.charAt(0).toUpperCase() +
                                service.status.slice(1)}
                            </span>
                            <button
                              onClick={() => {
                                setSelectedService(service);
                                setShowCustomerDetails(true);
                              }}
                              className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              View Details
                            </button>
                          </div>
                        </div>

                        {service.status === "ongoing" && (
                          <div className="border-t border-green-100 pt-4">
                            <div className="flex items-center space-x-4 mb-3">
                              <select
                                value={statusUpdate}
                                onChange={(e) =>
                                  setStatusUpdate(e.target.value)
                                }
                                className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                              >
                                <option value="">Update Status</option>
                                <option value="on_way">On My Way</option>
                                <option value="arrived">Arrived</option>
                                <option value="working">Working</option>
                                <option value="completed">Completed</option>
                              </select>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(service.id, statusUpdate)
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                              >
                                Update
                              </button>
                            </div>

                            {/* Chat Section */}
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="text-sm font-medium text-gray-900 mb-2">
                                Chat with {service.customerName}
                              </div>
                              <div className="max-h-32 overflow-y-auto space-y-2 mb-3">
                                {service.chat.map((msg: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className={`text-sm ${
                                      msg.sender === "provider"
                                        ? "text-right"
                                        : "text-left"
                                    }`}
                                  >
                                    <div
                                      className={`inline-block px-3 py-1 rounded-lg ${
                                        msg.sender === "provider"
                                          ? "bg-green-500 text-white"
                                          : "bg-gray-200 text-gray-900"
                                      }`}
                                    >
                                      {msg.message}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {msg.time}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  value={newMessage}
                                  onChange={(e) =>
                                    setNewMessage(e.target.value)
                                  }
                                  placeholder="Type your message..."
                                  className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                                />
                                <button
                                  onClick={() => sendMessage(service.id)}
                                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {service.status === "pending" && (
                          <div className="border-t border-green-100 pt-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleStatusUpdate(service.id, "ongoing")
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                              >
                                Accept Service
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(service.id, "rejected")
                                }
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        )}

                        {service.status === "completed" && (
                          <div className="border-t border-green-100 pt-4">
                            <div className="text-sm text-gray-600">
                              Service completed on {service.date}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Details Modal */}
        {showCustomerDetails && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Customer Details
                </h3>
                <button
                  onClick={() => setShowCustomerDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Name
                  </label>
                  <p className="text-gray-900">
                    {selectedService.customerName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <p className="text-gray-900">
                    {selectedService.customerPhone}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">
                    {selectedService.customerEmail}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Address
                  </label>
                  <p className="text-gray-900">{selectedService.address}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Details
                  </label>
                  <p className="text-gray-900">{selectedService.description}</p>
                </div>

                <div className="flex justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date & Time
                    </label>
                    <p className="text-gray-900">
                      {selectedService.date} at {selectedService.time}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <p className="text-green-600 font-semibold">
                      ৳{selectedService.price}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowCustomerDetails(false)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
