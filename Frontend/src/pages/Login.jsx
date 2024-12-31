import React from "react";

const Login = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold">Login</h2>
    <input
      type="email"
      placeholder="Email"
      className="mt-4 p-2 border rounded w-full"
    />
    <input
      type="password"
      placeholder="Password"
      className="mt-4 p-2 border rounded w-full"
    />
    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
      Login
    </button>
  </div>
);

export default Login;
