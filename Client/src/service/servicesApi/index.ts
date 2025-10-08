/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

//get all parent Category;
export const getAllParentCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pcategory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};

//get all service Category;
export const getAllServiceCategory = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const createService = async (serviceData: any) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/service/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(serviceData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error creating service:", error);
    throw new Error("Service creation failed");
  }
};

export const getAllservices = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // ensures fresh data each time
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
};
