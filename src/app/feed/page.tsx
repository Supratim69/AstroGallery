import { Suspense } from "react";
import FeedContentClient from "./FeedContentClient";

export const metadata = {
    title: "Image Feed",
};

export default async function FeedPage() {
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

                <div className="min-h-[500px]">
                    <Suspense
                        fallback={
                            <p className="text-center text-white">Loading...</p>
                        }
                    >
                        <FeedContentClient />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
