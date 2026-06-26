import React, { useState } from "react";
import axios from "axios";

const RequestTest = () => {
  const [formData, setFormData] = useState({
    testName: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
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
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:9090/request-test/send",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Request Sent Successfully");

      setFormData({
        testName: "",
        description: "",
        preferredDate: "",
        preferredTime: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed To Send Request");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex justify-center items-center p-5">

    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white p-8 text-center">

        <h1 className="text-4xl font-bold">
          Request New Test
        </h1>

        <p className="mt-2 text-cyan-100">
          Submit your custom test request to the administrator
        </p>

      </div>

      {/* Form */}
      <div className="p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Test Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Test Name
            </label>

            <input
              type="text"
              name="testName"
              value={formData.testName}
              onChange={handleChange}
              placeholder="Enter Test Name"
              required
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Why do you need this test?"
              required
              className="w-full border border-gray-300 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Preferred Date
              </label>

              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Preferred Time
              </label>

              <input
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl text-lg font-bold hover:scale-105 transition duration-300 shadow-lg"
          >
            Send Request
          </button>

        </form>

      </div>

    </div>

  </div>
);
};

export default RequestTest;