import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TestHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:9090/attempt/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data);
    } catch (error) {
      console.log("Error fetching history", error);
    } finally {
      setLoading(false);
    }
  };

  const highestScore =
    history.length > 0
      ? Math.max(...history.map((h) => h.score))
      : 0;

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-4 md:p-8">

    {/* HEADER */}
    <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white rounded-3xl shadow-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">

      <div>
        <h1 className="text-4xl font-bold">
          Test History
        </h1>

        <p className="text-cyan-100 mt-2">
          View all your attempted tests and performance
        </p>
      </div>

      <Link
        to="/student-dashboard"
        className="bg-white text-blue-800 px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Back Dashboard
      </Link>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Total Tests
        </h3>

        <p className="text-4xl font-bold text-indigo-700 mt-3">
          {history.length}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Highest Score
        </h3>

        <p className="text-4xl font-bold text-green-600 mt-3">
          {highestScore}%
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Passed Tests
        </h3>

        <p className="text-4xl font-bold text-purple-600 mt-3">
          {history.filter((item) => item.score >= 40).length}
        </p>
      </div>

    </div>

    {/* HISTORY TABLE */}
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-5 border-b">

        <h2 className="text-2xl font-bold text-gray-800">
          Attempted Tests
        </h2>

      </div>

      {loading ? (
        <div className="p-12 text-center">
          <p className="text-lg text-gray-500">
            Loading Test History...
          </p>
        </div>
      ) : history.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-red-500 text-lg font-medium">
            No Tests Attempted Yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="bg-gray-100 text-gray-700">

                <th className="p-5 text-left">
                  Test Name
                </th>

                <th className="p-5 text-center">
                  Score
                </th>

                <th className="p-5 text-center">
                  Date
                </th>

                <th className="p-5 text-center">
                  Result
                </th>

              </tr>
            </thead>

            <tbody>

              {history.map((attempt) => (
                <tr
                  key={attempt.id}
                  className="border-b hover:bg-blue-50 transition duration-200"
                >

                  <td className="p-5 font-semibold text-gray-800">
                    {attempt.testTitle}
                  </td>

                  <td className="p-5 text-center">

                    <span className="font-bold text-blue-700">
                      {attempt.score}%
                    </span>

                  </td>

                  <td className="p-5 text-center text-gray-600">
                    {new Date(
                      attempt.attemptDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-5 text-center">

                    {attempt.score >= 40 ? (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                        PASS
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold">
                        FAIL
                      </span>
                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>

  </div>
);
};

export default TestHistory;