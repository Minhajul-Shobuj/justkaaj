/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getServiceByID } from "@/service/servicesApi";
import { TService } from "@/types/service";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/Shared/Footer";

type CheckoutFormData = {
  fullName: string;
  phone: string;
  area_name: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  scheduledDate: string;
  scheduledTime: string;
  quantity: number;
};

const CheckoutPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState<TService | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const quantity = watch("quantity") || 1;
  const totalPrice = service ? Number(service.price) * quantity : 0;

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await getServiceByID(id as string);
        setService(res?.data);
      } catch (error) {
        console.error("Failed to load service", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchService();
  }, [id]);

  const onSubmit = async (data: CheckoutFormData) => {
    console.log(data);
    try {
      // if (!service) return toast.error("Service not found!");
      // setLoading(true);

      // const payload = {
      //   ...data,
      //   serviceId: service.id,
      //   price: totalPrice,
      // };

      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/order/create`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(payload),
      //   }
      // );

      // if (!res.ok) throw new Error("Failed to place order");

      toast.success("Order placed successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100/50 py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          {/* Header */}
          <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Confirm Your Booking
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-3 gap-10"
          >
            {/* Left: Form Section */}
            <div className="md:col-span-2 bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    {...register("fullName", { required: true })}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">Required</p>
                  )}
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-medium">
                    Phone
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">Required</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                📍 Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("area_name")}
                  placeholder="Area name"
                  className="border text-gray-900 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  {...register("street_address")}
                  placeholder="Street address"
                  className="border text-gray-900 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  {...register("city")}
                  placeholder="City"
                  className="border text-gray-900 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  {...register("state")}
                  placeholder="State"
                  className="border text-gray-900 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  {...register("postal_code", { valueAsNumber: true })}
                  placeholder="Postal code"
                  className="border text-gray-900 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Schedule */}
              <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                🗓 Schedule Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  {...register("scheduledDate", { required: true })}
                  className="border text-gray-900 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="time"
                  {...register("scheduledTime", { required: true })}
                  className="border text-gray-900 rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Quantity */}
              <div className="mt-4">
                <label className="text-gray-700 text-sm font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity", { valueAsNumber: true, min: 1 })}
                  defaultValue={1}
                  className="w-full text-gray-900 border border-gray-300 rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Right: Summary Section with button */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                  💰 Order Summary
                </h3>

                {service ? (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-3xl">
                        🧰
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {service.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          by{" "}
                          <span className="font-medium text-green-700">
                            {
                              service.providerServices[0]?.service_provider
                                ?.fullName
                            }
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 space-y-2">
                      <p>
                        Unit Price:{" "}
                        <span className="font-semibold text-gray-900">
                          ৳{service.price}
                        </span>
                      </p>
                      <p>
                        Quantity:{" "}
                        <span className="font-semibold text-gray-900">
                          {quantity}
                        </span>
                      </p>
                    </div>

                    <motion.p
                      key={totalPrice}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 text-2xl font-bold text-green-700 border-t pt-3"
                    >
                      Total: ৳{totalPrice.toFixed(2)}
                    </motion.p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Loading service info...
                  </p>
                )}
              </div>

              {/* Button on right side */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                {loading ? "Placing Order..." : "✅ Confirm Order"}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
