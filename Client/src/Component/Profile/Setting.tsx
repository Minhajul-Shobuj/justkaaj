"use client";
import ImageUploader from "@/ui/ImageUploader";
import ImagePreviewer from "@/ui/ImageUploader/ImagePreviewer";
import React, { useState, useEffect } from "react";

const Setting = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulate fetching user profile image from API/DB
  useEffect(() => {
    const existingProfileImg =
      "https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/sample.jpg"; // replace with API data
    setUploadedUrl(existingProfileImg);
  }, []);

  const handleUpload = async () => {
    if (!imageFiles.length) return;

    const formData = new FormData();
    formData.append("file", imageFiles[0]);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // from Cloudinary

    try {
      setUploading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setUploadedUrl(data.secure_url); // save new image
      setImageFiles([]);
      setImagePreview([]);
      setIsUpdating(false); // exit update mode
    } catch (error) {
      console.error("Cloudinary upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleCancelUpdate = () => {
    setImageFiles([]);
    setImagePreview([]);
    setIsUpdating(false); // back to old profile image
  };

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

          <div className="flex flex-col items-center gap-4">
            {/* If profile image exists and not updating */}
            {uploadedUrl && !isUpdating && (
              <div className="flex flex-col items-center">
                <img
                  src={uploadedUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-md"
                />
                <button
                  onClick={() => setIsUpdating(true)}
                  className="mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                >
                  Update Profile Image
                </button>
              </div>
            )}

            {/* Update mode */}
            {(!uploadedUrl || isUpdating) && (
              <>
                {imageFiles.length === 0 && (
                  <ImageUploader
                    label="Upload Profile Photo"
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                  />
                )}

                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />

                <div className="flex gap-2 mt-2">
                  {imageFiles.length > 0 && (
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  )}
                  <button
                    onClick={handleCancelUpdate}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
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
