"use client";
import ImageUploader from "@/ui/ImageUploader";
import ImagePreviewer from "@/ui/ImageUploader/ImagePreviewer";
import React, { useState } from "react";

const Setting = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Account Settings
      </h2>
      <div className="space-y-6">
        {/* ---- Profile Image Upload ---- */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Profile Image
          </h3>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Show uploader only if no image */}
            {imageFiles.length === 0 && (
              <ImageUploader
                label="Upload Profile Photo"
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
              />
            )}

            {/* Preview section */}
            <ImagePreviewer
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>
        </div>

        {/* ---- Change Password ---- */}
        <div className="border-t border-gray-200 pt-6">
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

        {/* ---- Notifications ---- */}
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
  );
};

export default Setting;
