import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    createdAt: "",
  });

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
        "http://localhost:9090/auth/registration",
        formData,
      );

      console.log(response.data);

      alert("Registration Successful");

      // Login page open
      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-green-50 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Registration Form
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Role</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
          </select>
        </div>

        {/* Created Time */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">Created Time</label>

          <input
            type="datetime-local"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;
