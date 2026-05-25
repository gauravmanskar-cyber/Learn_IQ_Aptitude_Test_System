import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9090/auth/login",
        formData,
      );

      console.log(response.data);

      // Store JWT Token
      localStorage.setItem("token", response.data.token);

      // Store Role
      localStorage.setItem("role", response.data.role);
      
      //store Id
      localStorage.setItem("userId", response.data.id);

      alert("Login Successful");

      // Role Based Navigation
      if (response.data.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      console.log(error);

      alert("Invalid Email Or Password");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Login Form
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-blue-600 font-semibold"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-700 font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
