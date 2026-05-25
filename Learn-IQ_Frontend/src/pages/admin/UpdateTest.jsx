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
        `http://localhost:9090/tests/${id}`,
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
        `http://localhost:9090/tests/update/${id}`,
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
          Update Test
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold">
              Test Title
            </label>

            <input
              type="text"
              name="title"
              value={testData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-green-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              name="description"
              value={testData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-green-500"
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
              value={testData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-green-500"
              required
            />
          </div>

          {/* Total Marks */}
          <div>
            <label className="block mb-2 font-semibold">
              Total Marks
            </label>

            <input
              type="number"
              name="totalMarks"
              value={testData.totalMarks}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-green-500"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block mb-2 font-semibold">
              Start Time
            </label>

            <input
              type="datetime-local"
              name="startTime"
              value={testData.startTime}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-green-500"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block mb-2 font-semibold">
              End Time
            </label>

            <input
              type="datetime-local"
              name="endTime"
              value={testData.endTime}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-green-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Update Test
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateTest;