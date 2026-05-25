import React, { useState } from "react";
import axios from "axios";

const AddTest = () => {
  const [testData, setTestData] = useState({
    title: "",
    description: "",
    duration: "",
    totalMarks: "",
    startTime: "",
    endTime: "",
  });

  // Input Change
  const handleChange = (e) => {
    setTestData({
      ...testData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...testData,

      user: {
        id: Number(localStorage.getItem("userId")),
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:9090/tests/add",
        finalData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Test Added Successfully");

      console.log(response.data);

      // Clear Form
      setTestData({
        title: "",
        description: "",
        duration: "",
        totalMarks: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed To Add Test");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Add New Test
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold">Test Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter Test Title"
              value={testData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold">Description</label>

            <textarea
              name="description"
              placeholder="Enter Description"
              value={testData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-2 font-semibold">
              Duration (Minutes)
            </label>

            <input
              type="number"
              name="duration"
              placeholder="Enter Duration"
              value={testData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Total Marks */}
          <div>
            <label className="block mb-2 font-semibold">Total Marks</label>

            <input
              type="number"
              name="totalMarks"
              placeholder="Enter Total Marks"
              value={testData.totalMarks}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block mb-2 font-semibold">Start Time</label>

            <input
              type="datetime-local"
              name="startTime"
              value={testData.startTime}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block mb-2 font-semibold">End Time</label>

            <input
              type="datetime-local"
              name="endTime"
              value={testData.endTime}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Add Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
