"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

export default function UploadPage() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Generate a preview URL
        }
    };

    // Handle image upload
    const handleUpload = async () => {
        if (!image) {
            setMessage("Please select a file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = async () => {
            const base64File = reader.result as string;

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        file: base64File,
                        mimeType: image.type,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error during upload:", errorText);
                    setMessage(`Upload failed: ${response.statusText}`);
                    return;
                }

                const data = await response.json();
                setMessage(`Image uploaded successfully: ${data.url}`);
            } catch (error) {
                console.error("Error during upload:", error);
                setMessage("An unexpected error occurred. Please try again.");
            }
        };

        reader.readAsDataURL(image); // Convert the image to a base64 string
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {preview && (
                    <div className="mt-4 w-full">
                        <Image
                            src={preview}
                            alt="Preview"
                            width={400} // Set a default width
                            height={300} // Set a default height
                            className="rounded-lg object-contain"
                        />
                    </div>
                )}
                <button
                    onClick={handleUpload}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
                >
                    Upload
                </button>
                {message && <p className="mt-4 text-gray-400">{message}</p>}
            </div>
        </div>
    );
}
