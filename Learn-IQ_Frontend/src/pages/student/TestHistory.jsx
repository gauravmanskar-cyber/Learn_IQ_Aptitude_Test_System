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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Test History
          </h1>

          <p className="text-green-100 mt-1">
            View all your attempted tests and scores
          </p>
        </div>

        <Link
          to="/student-dashboard"
          className="bg-white text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Back Dashboard
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm">
            Total Tests
          </h3>

          <p className="text-3xl font-bold text-green-700 mt-2">
            {history.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm">
            Highest Score
          </h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {highestScore}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500 text-sm">
            Passed Tests
          </h3>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {
              history.filter((item) => item.score >= 40)
                .length
            }
          </p>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            Attempted Tests
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="text-lg text-gray-500">
              Loading Test History...
            </div>
          </div>
        ) : history.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-red-500 text-lg">
              No Tests Attempted Yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 text-left">
                    Test Name
                  </th>

                  <th className="p-4 text-center">
                    Score
                  </th>

                  <th className="p-4 text-center">
                    Date
                  </th>

                  <th className="p-4 text-center">
                    Result
                  </th>
                </tr>
              </thead>

              <tbody>
                {history.map((attempt) => (
                  <tr
                    key={attempt.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {attempt.testTitle}
                    </td>

                    <td className="p-4 text-center font-semibold">
                      {attempt.score}%
                    </td>

                    <td className="p-4 text-center">
                      {new Date(
                        attempt.attemptDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-center">
                      {attempt.score >= 40 ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          PASS
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
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