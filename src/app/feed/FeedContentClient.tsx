"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface NasaImage {
    url: string;
    title: string;
    explanation: string;
}

export default function FeedContentClient() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const page = parseInt(searchParams?.get("page") || "1");
    const limit = 12;

    const [images, setImages] = useState<NasaImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/nasa-images?page=${page}&limit=${limit}`)
            .then((response) => response.json())
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

    if (isLoading) {
        return <p className="text-center text-white">Loading...</p>;
    }

    return (
        <>
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
        </>
    );
}
