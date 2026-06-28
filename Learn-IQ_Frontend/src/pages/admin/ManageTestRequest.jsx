import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageTestRequest = () => {
  const [requests, setRequests] = useState([]);
  const [tests, setTests] = useState([]);

  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const [selectedTestId, setSelectedTestId] = useState("");

  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [duration, setDuration] = useState("");
  const [adminRemark, setAdminRemark] = useState("");

  useEffect(() => {
    fetchRequests();
    fetchTests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://learn-iq-backend.onrender.com/request-test/getall",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(
        "https://learn-iq-backend.onrender.com/tests/getall",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.put(
        `https://learn-iq-backend.onrender.com/request-test/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.put(
        `https://learn-iq-backend.onrender.com/request-test/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const scheduleRequest = async () => {
    try {
      await axios.put(
        `https://learn-iq-backend.onrender.com/request-test/${selectedRequestId}/schedule`,
        {
          testId: selectedTestId,
          scheduledDate,
          scheduledTime,
          duration,
          adminRemark,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Test Scheduled Successfully");

      setSelectedRequestId(null);
      setSelectedTestId("");

      setScheduledDate("");
      setScheduledTime("");
      setDuration("");
      setAdminRemark("");

      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Failed To Schedule Test");
    }
  };
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">

    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white rounded-3xl shadow-xl p-8 mb-8">

        <h1 className="text-4xl font-bold">
          Manage Test Requests
        </h1>

        <p className="text-cyan-100 mt-2">
          Approve, reject and schedule student test requests
        </p>

      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5">

          <h2 className="text-2xl font-bold">
            Student Requests
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-blue-50">

                <th className="p-4">ID</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Test Name</th>
                <th className="p-4">Preferred Date</th>
                <th className="p-4">Preferred Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {requests.map((request) => (

                <tr
                  key={request.id}
                  className="border-b hover:bg-blue-50 transition text-center"
                >

                  <td className="p-4">
                    {request.id}
                  </td>

                  <td className="p-4">
                    {request.studentId}
                  </td>

                  <td className="p-4 font-medium">
                    {request.testName}
                  </td>

                  <td className="p-4">
                    {request.preferredDate}
                  </td>

                  <td className="p-4">
                    {request.preferredTime}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        request.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : request.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {request.status}
                    </span>

                    {request.scheduledDate && (
                      <div className="mt-2 text-xs text-green-700">
                        📅 {request.scheduledDate}
                        <br />
                        ⏰ {request.scheduledTime}
                      </div>
                    )}

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2 justify-center flex-wrap">

                      <button
                        onClick={() => approveRequest(request.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectRequest(request.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>

                      <button
                        disabled={request.status === "REJECTED"}
                        onClick={() =>
                          setSelectedRequestId(request.id)
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                      >
                        Schedule
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {requests.length === 0 && (

            <div className="text-center p-10 text-gray-500">
              No Requests Found
            </div>

          )}

        </div>

      </div>

      {/* SCHEDULE PANEL */}
      {selectedRequestId && (

        <div className="bg-white rounded-3xl shadow-xl mt-8 overflow-hidden">

          <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5">

            <h2 className="text-2xl font-bold">
              Schedule Request #{selectedRequestId}
            </h2>

          </div>

          <div className="p-6">

            <div className="grid md:grid-cols-2 gap-5">

              <select
                value={selectedTestId}
                onChange={(e) =>
                  setSelectedTestId(e.target.value)
                }
                className="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select Test
                </option>

                {tests.map((test) => (
                  <option
                    key={test.id}
                    value={test.id}
                  >
                    {test.title}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={scheduledDate}
                onChange={(e) =>
                  setScheduledDate(e.target.value)
                }
                className="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="time"
                value={scheduledTime}
                onChange={(e) =>
                  setScheduledTime(e.target.value)
                }
                className="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Duration (Minutes)"
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
                className="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Admin Remark"
                value={adminRemark}
                onChange={(e) =>
                  setAdminRemark(e.target.value)
                }
                className="border border-gray-300 p-4 rounded-xl md:col-span-2 focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="mt-6 flex gap-4">

              <button
                onClick={scheduleRequest}
                className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Save Schedule
              </button>

              <button
                onClick={() =>
                  setSelectedRequestId(null)
                }
                className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  </div>
);
};

export default ManageTestRequest;