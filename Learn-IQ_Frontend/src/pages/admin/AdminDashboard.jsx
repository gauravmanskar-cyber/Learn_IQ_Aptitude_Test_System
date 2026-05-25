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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-700 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <p className="text-blue-100 mt-1">Online Aptitude Test System</p>
          </div>

          {/* LOGOUT */}
          <Link
            to="/login"
            className="bg-white text-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          {adminStats.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm"
            >
              <h2 className="text-gray-600 text-sm">{item.title}</h2>

              <p className="text-3xl font-bold text-blue-700 mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">
          {/* RECENT TESTS */}
          <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Tests</h2>

              {/* CREATE TEST */}
              <Link
                to="/add-test"
                className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
              >
                + Create Test
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-gray-700">
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
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="p-4 font-medium">{test.title}</td>

                      <td className="p-4">{test.duration} Min</td>

                      <td className="p-4">{test.totalMarks}</td>

                      {/* ACTION BUTTONS */}
                      <td className="p-4">
                        <div className="flex gap-2">
                          {/* VIEW */}
                          <Link
                            to={`/view-test/${test.id}`}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                          >
                            View
                          </Link>

                          {/* EDIT */}
                          <Link
                            to={`/update-test/${test.id}`}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                          >
                            Edit
                          </Link>

                          {/* DELETE */}
                          <Link
                            to={`/delete-test/${test.id}`}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
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
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>

            {/* QUESTION BANK */}
            <Link
              to="/question-bank"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition block text-center"
            >
              Manage Question Bank
            </Link>

            

            {/* ADD QUESTIONS */}
            <Link
              to="/assign-questions"
              className="w-full bg-cyan-600 text-white py-3 rounded-xl hover:bg-cyan-700 transition block text-center"
            >
              Assign Questions
            </Link>

            {/* SCHEDULE TEST */}
            <Link
              to="/schedule-test"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition block text-center"
            >
              Schedule Test
            </Link>

            {/* RESULTS */}
            <Link
              to="/results"
              className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition block text-center"
            >
              View Results & Analytics
            </Link>

            {/* RANKINGS */}
            <Link
              to="/rankings"
              className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition block text-center"
            >
              View Rankings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
