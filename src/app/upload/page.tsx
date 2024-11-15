"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function UploadPage() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!image) {
            setMessage("Please select an image to upload.");
            return;
        }

        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setMessage("Image uploaded successfully!");
                setImage(null);
                setPreview(null);
            } else {
                const errorData = await response.json();
                setMessage(`Upload failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Upload Your Image</h1>
                <form onSubmit={handleUpload} className="flex flex-col gap-4">
                    <div>
                        <label
                            htmlFor="file"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Select an image to upload
                        </label>
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    {preview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-400 mb-2">
                                Preview:
                            </p>
                            <Image
                                src={preview}
                                alt="Image preview"
                                className="w-full rounded-lg border border-gray-700"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={uploading}
                        className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition ${
                            uploading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </form>
                {message && (
                    <div
                        className={`mt-4 text-center ${
                            message.startsWith("Upload failed")
                                ? "text-red-500"
                                : "text-green-500"
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
