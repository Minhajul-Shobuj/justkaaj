"use client";
import Loading from "@/app/loading";
import { getAllUsersOrder, getOrderById } from "@/service/OrderApi";
import { TOrder } from "@/types/order";
import React, { useEffect, useState } from "react";

export const Order = () => {
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllUsersOrder();
        setOrders(res?.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  //order details
  const selectOrder = async (id: string) => {
    try {
      const res = await getOrderById(id);
      setSelectedOrder(res?.data);
    } catch (err) {
      setError("Failed to load order details.");
      console.error("Error fetching order details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10 text-lg">{error}</div>
    );
  }
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>
        <div className="grid gap-4">
          {orders.map((order: TOrder) => (
            <div
              key={order.id}
              className="bg-white border border-green-100 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order?.service?.title}
                  </h3>
                  <p className="text-gray-600">
                    Provider: {order.provider.fullName}
                  </p>
                  <p className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-GB")} at{" "}
                    {new Date(order.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
                      setShowOrderDetails(true);
                      selectOrder(order.id);
                    }}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancelOrder(order.price)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold border border-red-200 rounded px-2 py-1 ml-2"
                      >
                        Cancel
                      </button>
                    )}
                </div>
              </div>
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
                  <p className="text-gray-900">
                    {selectedOrder?.provider?.fullName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <p className="text-gray-900">
                    {selectedOrder?.provider?.user?.phone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">
                    {selectedOrder?.provider?.email}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Booked At (Date & Time)
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedOrder?.createdAt).toLocaleDateString(
                        "en-GB"
                      )}{" "}
                      at{" "}
                      {new Date(selectedOrder?.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Details
                  </label>
                  <p className="text-gray-900">
                    {selectedOrder?.service?.description}
                  </p>
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
