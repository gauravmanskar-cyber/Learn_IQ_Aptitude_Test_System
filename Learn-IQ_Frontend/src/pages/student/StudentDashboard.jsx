import React from 'react'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {

  const tests = [
    {
      id: 1,
      name: "Java Test",
      duration: "30 Minutes"
    },
    {
      id: 2,
      name: "Python Test",
      duration: "45 Minutes"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-green-700 text-white p-5 rounded-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p>Welcome Student</p>
        </div>

        <div className="flex gap-3">

          {/* SEND REQUEST PAGE */}
          <Link
            to="/request-test"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Request Test
          </Link>

          {/* LOGIN PAGE */}
          <Link
            to="/login"
            className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </Link>

        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-600">Tests Attempted</h2>
          <p className="text-3xl font-bold text-green-700 mt-2">15</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-600">Highest Score</h2>
          <p className="text-3xl font-bold text-blue-700 mt-2">92%</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-600">Pending Tests</h2>
          <p className="text-3xl font-bold text-red-700 mt-2">3</p>
        </div>

      </div>

      {/* AVAILABLE TESTS */}
      <div className="bg-white mt-8 p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Available Tests
          </h2>

          {/* TEST HISTORY PAGE */}
          <Link
            to="/history"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            View History
          </Link>

        </div>

        <div className="space-y-4">

          {tests.map((test) => (
            <div
              key={test.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {test.name}
                </h3>

                <p className="text-gray-500">
                  {test.duration}
                </p>
              </div>

              {/* START TEST PAGE */}
              <Link
                to={`/start-test/${test.id}`}
                className="bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Start Test
              </Link>
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default StudentDashboard