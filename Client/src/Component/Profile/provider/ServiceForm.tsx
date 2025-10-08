/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createService,
  getAllParentCategory,
  getAllServiceCategory,
} from "@/service/servicesApi";
import { TServiceCategory, TParentcategory, TService } from "@/types/service";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AddService() {
  const [parentCategories, setParentCategories] = useState<TServiceCategory[]>(
    []
  );
  const [serviceCategories, setServiceCategories] = useState<
    TServiceCategory[]
  >([]);

  const { register, handleSubmit, control, reset, watch } = useForm<TService>({
    defaultValues: {
      title: "",
      description: "",
      area: "",
      price: "",
      parentCategory: "",
      category: [],
      availabilities: weekDays.map((day) => ({
        day,
        startTime: "09:00",
        endTime: "18:00",
        isAvailable: false,
      })),
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      const parent = await getAllParentCategory();
      const service = await getAllServiceCategory();
      setParentCategories(parent?.data || []);
      setServiceCategories(service?.data || []);
    }
    fetchCategories();
  }, []);

  const onSubmit = async (data: TService) => {
    reset();
    try {
      const cleaned = {
        ...data,
        price: Number(data.price),
        availabilities: data.availabilities.map((a) => ({
          ...a,
          startTime: a.isAvailable ? a.startTime : "not available",
          endTime: a.isAvailable ? a.endTime : "not available",
        })),
      };
      const res = await createService(cleaned);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Add New Service
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Title
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter service title"
            className="w-full text-black px-3 py-2 border rounded-md border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area
          </label>
          <input
            {...register("area", { required: true })}
            type="text"
            placeholder="Enter service area"
            className="w-full text-black px-3 py-2 border rounded-md border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            {...register("price", { required: true })}
            type="number"
            placeholder="Enter price"
            className="w-full text-black px-3 py-2 border rounded-md border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Parent Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent Category
          </label>
          <select
            {...register("parentCategory", { required: true })}
            className="w-full text-black px-3 py-2 border rounded-md border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          >
            <option value="">Select Parent Category</option>
            {parentCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Service Category (Chip Style) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Category
          </label>

          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              const selectedIds: string[] = (
                field.value as TServiceCategory[] | string[]
              ).map((item) => (typeof item === "string" ? item : item.id));

              return (
                <div className="flex flex-wrap gap-2 min-h-[80px] p-2 border rounded-md border-gray-300">
                  {serviceCategories.map((cat) => {
                    const isSelected = selectedIds.includes(cat.id);

                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => {
                          if (isSelected) {
                            field.onChange(
                              selectedIds.filter((id) => id !== cat.id)
                            );
                          } else {
                            field.onChange([...selectedIds, cat.id]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                          isSelected
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-gray-100 text-gray-700 border border-gray-300"
                        } hover:opacity-80`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              );
            }}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe your service"
            className="w-full text-black px-3 py-2 border rounded-md border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Availabilities */}
        <div className="md:col-span-2">
          <h3 className="text-md font-semibold text-gray-800 mb-3">
            Weekly Availability
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className="flex items-center justify-between border p-3 rounded-md"
              >
                <span className="font-medium text-black">{day}</span>
                <div className="flex items-center gap-2">
                  {/* Availability Select */}
                  <Controller
                    name={`availabilities.${index}.isAvailable`}
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        value={field.value ? "true" : "false"}
                        onChange={(e) =>
                          field.onChange(e.target.value === "true")
                        }
                        className="px-2 py-1 text-black border rounded-md border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                      </select>
                    )}
                  />

                  {/* Start Time */}
                  <Controller
                    name={`availabilities.${index}.startTime`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="time"
                        {...field}
                        disabled={!watch(`availabilities.${index}.isAvailable`)}
                        className="px-2 py-1 border rounded-md border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-black disabled:bg-gray-100 disabled:text-gray-400"
                      />
                    )}
                  />

                  <span>-</span>

                  {/* End Time */}
                  <Controller
                    name={`availabilities.${index}.endTime`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="time"
                        {...field}
                        disabled={!watch(`availabilities.${index}.isAvailable`)}
                        className="px-2 py-1 border rounded-md border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-black disabled:bg-gray-100 disabled:text-gray-400"
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
}
