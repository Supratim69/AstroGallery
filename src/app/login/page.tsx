"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for login logic
        router.push("/feed");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Welcome back!
                </h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="p-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/register">
                            <span className="text-blue-600 hover:underline cursor-pointer">
                                Sign up
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
