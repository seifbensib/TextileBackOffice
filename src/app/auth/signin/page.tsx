"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import useLocalStorage from "./../../../hooks/useLocalStorage"; // Adjust the import based on your file structure

const Signin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useLocalStorage<string | null>("token", null); // Hook for local storage

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
        const response = await fetch("http://localhost:3020/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error("Login failed");

        const data = await response.json(); // Parse the JSON response
        console.log(data); // Log the response to check its structure

        setToken(data.access_token); // Access the token correctly
        router.push("/");
    } catch (error) {
        console.error(error); // Log the error for debugging
        setError("Login failed. Please check your credentials.");
    }
};

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Google Sign-in Button */}
      <button className="flex items-center justify-center w-full bg-white text-gray-700 border rounded px-4 py-2 mb-4 shadow-sm hover:bg-gray-100">
        <FaGoogle className="mr-2" />
        Sign in with Google
      </button>
      {/* Divider */}
      <div className="flex items-center justify-center my-4">
        <span className="w-full border-t border-gray-300"></span>
      </div>
      <div className="flex items-center justify-center my-4">
        <span className="px-2 text-gray-500">Or sign in with email</span>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Email and Password fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Remember me and Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>

      {/* Sign Up link */}
      {/* <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have any account?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </p> */}
    </div>
  );
};

export default Signin;
