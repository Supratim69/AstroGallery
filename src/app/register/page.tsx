"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for register logic
        router.push("/feed");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Create an account
                </h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="p-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login">
                            <span className="text-green-600 hover:underline cursor-pointer">
                                Login
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
