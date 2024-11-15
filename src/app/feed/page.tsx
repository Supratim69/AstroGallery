"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface NasaImage {
    url: string;
    title: string;
    explanation: string;
}

async function fetchPaginatedImages(
    page: number,
    limit: number
): Promise<NasaImage[]> {
    const response = await fetch(
        `/api/nasa-images?page=${page}&limit=${limit}`
    );
    return response.json();
}

export default function FeedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [images, setImages] = useState<NasaImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const page = parseInt(searchParams?.get("page") || "1");
    const limit = 12;

    useEffect(() => {
        setIsLoading(true);
        fetchPaginatedImages(page, limit)
            .then((data) => {
                setImages(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
                setIsLoading(false);
            });
    }, [page]);

    const handleNextPage = () => {
        router.push(`?page=${page + 1}`);
    };

    const handlePreviousPage = () => {
        if (page > 1) router.push(`?page=${page - 1}`);
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">Feed</h1>
                    <a
                        href="/upload"
                        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition"
                    >
                        Upload
                    </a>
                </div>

                {/* Content Section */}
                <div className="min-h-[500px]">
                    {isLoading ? (
                        <p className="text-center text-white">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
                                >
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={image.url}
                                            alt={image.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-t-lg"
                                        />
                                    </div>

                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-white truncate">
                                            {image.title}
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                                            {image.explanation}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded ${
                            page === 1
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-500"
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-white">Page {page}</span>
                    <button
                        onClick={handleNextPage}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
