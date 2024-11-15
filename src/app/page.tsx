import React from "react";
import Link from "next/link";
import { FaGlobe, FaUserAstronaut, FaRocket } from "react-icons/fa";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-6 text-center">
            <div className="max-w-4xl">
                <h1 className="text-5xl font-bold mb-6">
                    Welcome to AstroGallery
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                    Discover the wonders of the universe. Register or log in to
                    start your journey.
                </p>

                <div className="flex justify-center space-x-4 mb-12">
                    <Link href="/register">
                        <span className="px-6 py-3 bg-indigo-600 rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
                            Register
                        </span>
                    </Link>
                    <Link href="/login">
                        <span className="px-6 py-3 bg-gray-700 rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                            Login
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <FaGlobe className="text-indigo-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">
                            Explore the Universe
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Browse thousands of stunning images captured by NASA
                            spacecraft.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <FaUserAstronaut
                            className="text-indigo-500 mb-4"
                            size={32}
                        />
                        <h3 className="text-xl font-bold text-white mb-2">
                            Learn about Space
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Discover the latest news, facts, and insights about
                            space exploration.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <FaRocket className="text-indigo-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">
                            Stay Up-to-Date
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Follow the latest missions and advancements in the
                            world of space travel.
                        </p>
                    </div>
                </div>

                <div className="text-center text-gray-400 mt-6">
                    <p>
                        Powered by{" "}
                        <Link
                            href="https://www.nasa.gov/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 hover:underline"
                        >
                            NASA
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
