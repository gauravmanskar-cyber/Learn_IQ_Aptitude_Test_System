import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteTest = () => {

  const [tests, setTests] = useState([]);

  // Fetch All Tests
  useEffect(() => {

    fetchTests();

  }, []);

  const fetchTests = async () => {

    try {

      const response = await axios.get(
        "http://localhost:9090/tests/getall",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTests(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed To Fetch Tests");

    }
  };

  // Delete Test
  const deleteTest = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:9090/tests/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Test Deleted Successfully");

      // UI Update
      setTests(tests.filter((test) => test.id !== id));

    } catch (error) {

      console.log(error);
      alert("Failed To Delete Test");

    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 p-6">

    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">

        <h1 className="text-4xl font-bold text-white">
          Delete Tests
        </h1>

        <p className="text-gray-300 mt-2">
          Manage and remove tests from the LearnIQ platform
        </p>

      </div>

      {/* Stats Card */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-xl">

          <h3 className="text-gray-500 font-medium">
            Total Tests
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {tests.length}
          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">

          <h3 className="text-gray-500 font-medium">
            Active Tests
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {tests.length}
          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">

          <h3 className="text-gray-500 font-medium">
            Delete Management
          </h3>

          <p className="text-lg font-semibold text-red-500 mt-3">
            Admin Access
          </p>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">

          <h2 className="text-2xl font-bold text-white">
            Test List
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-red-50">

                <th className="p-5 text-left text-gray-700">
                  ID
                </th>

                <th className="p-5 text-left text-gray-700">
                  Test Title
                </th>

                <th className="p-5 text-left text-gray-700">
                  Duration
                </th>

                <th className="p-5 text-left text-gray-700">
                  Total Marks
                </th>

                <th className="p-5 text-center text-gray-700">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {tests.length > 0 ? (

                tests.map((test) => (

                  <tr
                    key={test.id}
                    className="border-b hover:bg-red-50 transition-all duration-200"
                  >

                    <td className="p-5 font-semibold text-gray-700">
                      #{test.id}
                    </td>

                    <td className="p-5">

                      <div>

                        <h3 className="font-bold text-gray-800">
                          {test.title}
                        </h3>

                      </div>

                    </td>

                    <td className="p-5">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl font-medium">
                        {test.duration} Min
                      </span>

                    </td>

                    <td className="p-5">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl font-medium">
                        {test.totalMarks} Marks
                      </span>

                    </td>

                    <td className="p-5 text-center">

                      <button
                        onClick={() => deleteTest(test.id)}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-16"
                  >

                    <div>

                      <h3 className="text-2xl font-bold text-gray-500">
                        No Tests Found
                      </h3>

                      <p className="text-gray-400 mt-2">
                        There are currently no tests available.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>
);
};

export default DeleteTest;