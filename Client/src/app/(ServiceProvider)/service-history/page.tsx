"use client";
import React, { useEffect, useState } from "react";
import { getOrderById, getProviderServicesHistory } from "@/service/OrderApi";
import Loading from "@/app/loading";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/Shared/Footer";
import { TOrder } from "@/types/order";

const ServiceHistory = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getProviderServicesHistory();
        setOrders(res?.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const selectOrder = async (id: string) => {
    try {
      const res = await getOrderById(id);
      setSelectedOrder(res?.data);
    } catch (err) {
      console.error("Error fetching order details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!orders.length)
    return (
      <div className="text-center py-20 text-gray-500">
        No service history found 😔
      </div>
    );
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🧾 My Service History
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border rounded-2xl shadow-sm p-5 bg-white hover:shadow-md transition-shadow"
            >
              {/* Left side: Service info */}
              <div className="flex items-start gap-4 w-full md:w-2/3">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {order.service?.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {order.service?.description}
                  </p>
                </div>
              </div>

              {/* Right side: Order info */}
              <div className="flex flex-col md:items-end gap-2 text-sm text-gray-700 w-full md:w-1/3">
                <div>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.scheduledDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Time:</span>{" "}
                  {order.scheduledTime}
                </div>
                <div>
                  <span className="font-medium">Quantity:</span>{" "}
                  {order.quantity}
                </div>
                <div>
                  <span className="font-medium">Total:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    ৳{order.price * order.quantity}
                  </span>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                    order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>

                <button
                  onClick={() => selectOrder(order?.id)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 text-sm transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg mx-4 p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedOrder.service?.title}
                </h2>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Description:</span>{" "}
                {selectedOrder.service?.description || "No description"}
              </p>
              <p>
                <span className="font-medium">Customer Name:</span>{" "}
                {selectedOrder?.fullName || "N/A"}
              </p>
              <p>
                <span className="font-medium">Customer Phone:</span>{" "}
                {selectedOrder?.phone || "N/A"}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {selectedOrder?.address?.street_address},{" "}
                {selectedOrder?.address?.area_name},{" "}
                {selectedOrder?.address?.city}
              </p>
              <p>
                <span className="font-medium">Scheduled Date:</span>{" "}
                {new Date(selectedOrder.scheduledDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Scheduled Time:</span>{" "}
                {selectedOrder.scheduledTime}
              </p>
              <p>
                <span className="font-medium">Quantity:</span>{" "}
                {selectedOrder.quantity}
              </p>
              <p>
                <span className="font-medium">Total Price:</span>{" "}
                <span className="text-green-600 font-semibold">
                  ৳{selectedOrder.price * selectedOrder.quantity}
                </span>
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedOrder.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : selectedOrder.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceHistory;
