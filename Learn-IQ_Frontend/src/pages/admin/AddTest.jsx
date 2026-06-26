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
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex justify-center items-center p-6">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white p-8">

        <h1 className="text-4xl font-bold">
          Create New Test
        </h1>

        <p className="text-cyan-100 mt-2">
          Create and schedule a new aptitude test for students
        </p>

      </div>

      {/* FORM */}
      <div className="p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Test Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter Test Title"
              value={testData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter Description"
              value={testData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* DURATION + MARKS */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Duration (Minutes)
              </label>

              <input
                type="number"
                name="duration"
                placeholder="Enter Duration"
                value={testData.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Total Marks
              </label>

              <input
                type="number"
                name="totalMarks"
                placeholder="Enter Total Marks"
                value={testData.totalMarks}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

          </div>

          {/* START TIME + END TIME */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Start Time
              </label>

              <input
                type="datetime-local"
                name="startTime"
                value={testData.startTime}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                End Time
              </label>

              <input
                type="datetime-local"
                name="endTime"
                value={testData.endTime}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
          >
            Create Test
          </button>

        </form>

      </div>

    </div>

  </div>
);}

export default AddTest;
