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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Request New Test
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-2">
              Test Name
            </label>

            <input
              type="text"
              name="testName"
              value={formData.testName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Enter Test Name"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-3 rounded-lg"
              placeholder="Why do you need this test?"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Preferred Date
            </label>

            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Preferred Time
            </label>

            <input
              type="time"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800"
          >
            Send Request
          </button>

        </form>
      </div>
    </div>
  );
};

export default RequestTest;