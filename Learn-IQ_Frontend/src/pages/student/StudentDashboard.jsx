import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  // STATE
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH TESTS FROM BACKEND
  const fetchTests = async () => {
    try {
      const response = await axios.get("https://learn-iq-backend.onrender.com/tests/getall");

      console.log(response.data);

      setTests(response.data);
    } catch (error) {
      console.log("Error Fetching Tests", error);
    } finally {
      setLoading(false);
    }
  };

  // PAGE LOAD HONE PAR API CALL
  useEffect(() => {
    fetchTests();
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">

    {/* HEADER */}
    <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center">

      <div>
        <h1 className="text-4xl font-bold">
          Learn<span className="text-cyan-300">IQ</span>
        </h1>

        <p className="mt-2 text-gray-200 text-lg">
          Welcome Student 👋
        </p>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0">

        <Link
          to="/request-test"
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl font-semibold"
        >
          Request Test
        </Link>

        <Link
          to="/login"
          className="bg-white text-blue-800 px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </Link>

      </div>
    </div>

    {/* STATISTICS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500 text-lg">
          Tests Attempted
        </h3>

        <p className="text-4xl font-bold text-green-600 mt-3">
          15
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500 text-lg">
          Highest Score
        </h3>

        <p className="text-4xl font-bold text-blue-600 mt-3">
          92%
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500 text-lg">
          Pending Tests
        </h3>

        <p className="text-4xl font-bold text-red-600 mt-3">
          3
        </p>
      </div>

    </div>

    {/* AVAILABLE TESTS */}
    <div className="bg-white mt-8 p-6 rounded-3xl shadow-xl">

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">

        <h2 className="text-3xl font-bold text-gray-800">
          Available Tests
        </h2>

        <div className="flex gap-3">

          <Link
            to="/test-history"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            View History
          </Link>

          <Link
            to="/my-requests"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
          >
            My Requests
          </Link>

        </div>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            Loading Tests...
          </p>
        </div>
      ) : tests.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-red-500 text-lg">
            No Tests Available
          </p>
        </div>
      ) : (
        <div className="grid gap-5">

          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-gradient-to-r from-white to-blue-50 border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300 flex flex-col md:flex-row justify-between items-center"
            >

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {test.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  Duration : {test.duration} Minutes
                </p>
              </div>

              <Link
                to={`/start-test/${test.id}`}
                className="mt-3 md:mt-0 bg-gradient-to-r from-green-600 to-emerald-500 hover:scale-105 transition text-white px-6 py-3 rounded-xl font-semibold"
              >
                Start Test
              </Link>

            </div>
          ))}

        </div>
      )}

    </div>

  </div>
);}

export default StudentDashboard;
