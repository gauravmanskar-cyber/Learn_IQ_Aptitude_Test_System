import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export function AdminDashboard() {
  // Dashboard Stats
  const adminStats = [
    { title: "Total Students", value: "1,250" },
    { title: "Active Tests", value: "12" },
    { title: "Questions Added", value: "3,450" },
    { title: "Average Score", value: "78%" },
  ];

  // Backend Tests
  const [recentTests, setRecentTests] = useState([]);

  // Fetch Tests
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get("http://localhost:9090/tests/getall", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);

      setRecentTests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white p-8 flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-cyan-100 mt-2">
            LearnIQ Online Aptitude Test System
          </p>
        </div>

        <Link
          to="/login"
          className="bg-white text-blue-800 px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Logout
        </Link>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">

        {adminStats.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition"
          >
            <h2 className="text-gray-500">
              {item.title}
            </h2>

            <p className="text-4xl font-bold text-blue-700 mt-3">
              {item.value}
            </p>
          </div>
        ))}

      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">

        {/* RECENT TESTS */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xl">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Recent Tests
            </h2>

            <Link
              to="/add-test"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              + Create Test
            </Link>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-cyan-100">

                  <th className="p-4">Test Title</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Total Marks</th>
                  <th className="p-4">Action</th>

                </tr>
              </thead>

              <tbody>

                {recentTests.map((test) => (
                  <tr
                    key={test.id}
                    className="border-b hover:bg-blue-50 transition duration-200"
                  >

                    <td className="p-4 font-semibold">
                      {test.title}
                    </td>

                    <td className="p-4">
                      {test.duration} Min
                    </td>

                    <td className="p-4">
                      {test.totalMarks}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2 flex-wrap">

                        <Link
                          to={`/view-test/${test.id}`}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                        >
                          View
                        </Link>

                        <Link
                          to={`/update-test/${test.id}`}
                          className="bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600"
                        >
                          Edit
                        </Link>

                        <Link
                          to={`/delete-test/${test.id}`}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </Link>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <Link
              to="/question-bank"
              className="block text-center bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition"
            >
              Manage Question Bank
            </Link>

            <Link
              to="/assign-questions"
              className="block text-center bg-cyan-600 text-white py-4 rounded-xl hover:bg-cyan-700 transition"
            >
              Assign Questions
            </Link>

            <Link
              to="/test_requests"
              className="block text-center bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition"
            >
              Manage Test Request
            </Link>

            <Link
              to="/results"
              className="block text-center bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition"
            >
              View Results & Analytics
            </Link>

            <Link
              to="/rankings"
              className="block text-center bg-pink-600 text-white py-4 rounded-xl hover:bg-pink-700 transition"
            >
              View Rankings
            </Link>

          </div>

        </div>

      </div>

    </div>
  </div>
);}

export default AdminDashboard;
