import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Navigate, useNavigate } from "react-router-dom";

const UpdateTest = () => {

  const navigate = useNavigate();

  // URL se id lena
  const { id } = useParams();

  const [testData, setTestData] = useState({
    title: "",
    description: "",
    duration: "",
    totalMarks: "",
    startTime: "",
    endTime: "",
  });

  // Existing Test Load
  useEffect(() => {

    fetchTest();

  }, []);

  const fetchTest = async () => {

    try {

      const response = await axios.get(
        `https://learn-iq-backend.onrender.com/tests/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTestData(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed To Fetch Test");

    }
  };

  // Input Change
  const handleChange = (e) => {

    setTestData({
      ...testData,
      [e.target.name]: e.target.value,
    });

  };

  // Update Test
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `https://learn-iq-backend.onrender.com/tests/update/${id}`,
        testData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Test Updated Successfully");
      navigate("/admin-dashboard");

    } catch (error) {

      console.log(error);
      alert("Failed To Update Test");

    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 p-6 flex justify-center items-center">

    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-cyan-700 p-8 text-white">

        <h1 className="text-4xl font-bold">
          ✏️ Update Test
        </h1>

        <p className="mt-2 text-cyan-100">
          Modify test information and save changes
        </p>

      </div>

      {/* FORM */}
      <div className="p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Test Title
            </label>

            <input
              type="text"
              name="title"
              value={testData.title}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Test Title"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={testData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Description"
              required
            />
          </div>

          {/* DURATION + MARKS */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Duration (Minutes)
              </label>

              <input
                type="number"
                name="duration"
                value={testData.duration}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Total Marks
              </label>

              <input
                type="number"
                name="totalMarks"
                value={testData.totalMarks}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

          </div>

          {/* TIME */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Start Time
              </label>

              <input
                type="datetime-local"
                name="startTime"
                value={testData.startTime}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                End Time
              </label>

              <input
                type="datetime-local"
                name="endTime"
                value={testData.endTime}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={() => navigate("/admin-dashboard")}
              className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-xl font-bold transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg transition duration-300 hover:scale-105"
            >
              Update Test
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
);}
  


export default UpdateTest;