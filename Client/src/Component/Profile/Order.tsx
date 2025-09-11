import React, { useState } from "react";

export const Order = () => {
  // Add interfaces and mock data for My Orders section
  interface ChatMessage {
    sender: "provider" | "user";
    message: string;
    time: string;
  }
  interface UserOrder {
    id: number;
    providerName: string;
    providerPhone: string;
    providerEmail: string;
    serviceName: string;
    date: string;
    time: string;
    address: string;
    status: "pending" | "ongoing" | "completed" | "cancelled";
    price: number;
    description: string;
    chat: ChatMessage[];
  }

  const mockUserOrders: UserOrder[] = [
    {
      id: 1,
      providerName: "CleanPro Services",
      providerPhone: "+880 1712-111222",
      providerEmail: "contact@cleanpro.com",
      serviceName: "Home Cleaning",
      date: "2024-01-15",
      time: "10:00 AM",
      address: "House #123, Road #5, Dhanmondi, Dhaka",
      status: "ongoing",
      price: 1500,
      description: "Full house cleaning including kitchen and bathrooms",
      chat: [
        {
          sender: "provider",
          message: "I'll be there in 15 minutes",
          time: "09:32 AM",
        },
        { sender: "user", message: "Thank you!", time: "09:33 AM" },
      ],
    },
    {
      id: 2,
      providerName: "CarCare Dhaka",
      providerPhone: "+880 1812-333444",
      providerEmail: "info@carcare.com",
      serviceName: "Car Wash",
      date: "2024-01-14",
      time: "2:00 PM",
      address: "Parking Lot, Bashundhara City, Dhaka",
      status: "completed",
      price: 800,
      description: "Exterior and interior car cleaning",
      chat: [
        {
          sender: "provider",
          message: "Service completed successfully",
          time: "3:30 PM",
        },
        { sender: "user", message: "Great job!", time: "3:31 PM" },
      ],
    },
    {
      id: 3,
      providerName: "PlumbRight",
      providerPhone: "+880 1912-555666",
      providerEmail: "support@plumbright.com",
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

  // Add state for My Orders section
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>
        <div className="grid gap-4">
          {mockUserOrders.map((order: UserOrder) => (
            <div
              key={order.id}
              className="bg-white border border-green-100 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order.serviceName}
                  </h3>
                  <p className="text-gray-600">
                    Provider: {order.providerName}
                  </p>
                  <p className="text-gray-600">
                    {order.date} at {order.time}
                  </p>
                  <p className="text-green-600 font-medium">৳{order.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderDetails(true);
                    }}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold border border-red-200 rounded px-2 py-1 ml-2"
                      >
                        Cancel
                      </button>
                    )}
                </div>
              </div>
              {order.status === "ongoing" && (
                <div className="border-t border-green-100 pt-4">
                  {/* Chat Section */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      Chat with {order.providerName}
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-2 mb-3">
                      {order.chat.map((msg: ChatMessage, idx: number) => (
                        <div
                          key={idx}
                          className={`text-sm ${
                            msg.sender === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          <div
                            className={`inline-block px-3 py-1 rounded-lg ${
                              msg.sender === "user"
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
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                      />
                      <button
                        onClick={() => sendMessage(order.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Details
                </h3>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Provider Name
                  </label>
                  <p className="text-gray-900">{selectedOrder.providerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <p className="text-gray-900">{selectedOrder.providerPhone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedOrder.providerEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Address
                  </label>
                  <p className="text-gray-900">{selectedOrder.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Details
                  </label>
                  <p className="text-gray-900">{selectedOrder.description}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date & Time
                    </label>
                    <p className="text-gray-900">
                      {selectedOrder.date} at {selectedOrder.time}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <p className="text-green-600 font-semibold">
                      ৳{selectedOrder.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
// Add helper functions for status color, cancel, and send message
function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "ongoing":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
function handleCancelOrder(orderId: number) {
  alert(`Order ${orderId} cancelled.`);
}
function sendMessage(orderId: number) {
  alert(`Message sent to provider for order ${orderId}.`);
}
