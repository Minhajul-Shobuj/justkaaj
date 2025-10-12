/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const createOrder = async (orderData: any) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(orderData),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error creating Order:", error);
    throw new Error("Order creation failed");
  }
};
