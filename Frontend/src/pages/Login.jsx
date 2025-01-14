import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import login from "../assets/login.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Added error state for handling invalid login

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError(""); // Reset error message
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email === "test@example.com" && password === "password") {
        alert("Login Successful!"); // Replace with your logic
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }, 2000);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
      <div className="w-full md:w-2/3 flex rounded-lg shadow-2xl overflow-hidden">
        {/* Left side (Image) */}
        <div className="hidden md:block w-1/2 bg-cover bg-center relative">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${login})` }}></div>
          <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for better visibility */}
        </div>

        {/* Right side (Form) */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-r-lg shadow-lg">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">Login to PayManni</h2>

          {/* Displaying error message */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : "Login"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/signup" className="text-blue-600 hover:underline text-sm">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
