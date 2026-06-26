import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:9090/request-test/my-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusColor = (status) => {
    if (status === "APPROVED") return "text-green-600";
    if (status === "REJECTED") return "text-red-600";

    return "text-yellow-600";
  };

  const getTestWindowStatus = (request) => {
    if (!request.scheduledDate || !request.scheduledTime || !request.duration) {
      return "NOT_SCHEDULED";
    }

    const startTime = new Date(
      `${request.scheduledDate}T${request.scheduledTime}`,
    );

    const endTime = new Date(
      startTime.getTime() + request.duration * 60 * 1000,
    );

    const now = new Date();

    if (now < startTime) {
      return "UPCOMING";
    }

    if (now > endTime) {
      return "EXPIRED";
    }

    return "LIVE";
  };

  const getWindowColor = (status) => {
    switch (status) {
      case "LIVE":
        return "bg-green-100 text-green-700";

      case "UPCOMING":
        return "bg-yellow-100 text-yellow-700";

      case "EXPIRED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const startTest = async (testId) => {
     navigate(`/start-test/${testId}`);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">

    {/* HEADER */}
    <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white p-8 rounded-3xl shadow-xl mb-8">

      <h1 className="text-4xl font-bold">
        My Test Requests
      </h1>

      <p className="mt-2 text-cyan-100">
        Track all your requested and scheduled tests
      </p>

    </div>

    {/* LOADING */}
    {loading ? (
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

        <p className="text-lg text-gray-500">
          Loading Requests...
        </p>

      </div>
    ) : requests.length === 0 ? (
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

        <p className="text-red-500 text-lg font-semibold">
          No Requests Found
        </p>

      </div>
    ) : (
      <div className="grid gap-6">

        {requests.map((request) => {
          const testWindowStatus =
            getTestWindowStatus(request);

          return (
            <div
              key={request.id}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all"
            >

              {/* TOP SECTION */}
              <div className="flex flex-col lg:flex-row justify-between gap-5">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {request.testName}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {request.description}
                  </p>

                </div>

                <div className="flex flex-col items-start lg:items-end gap-2">

                  <span
                    className={`font-bold text-lg ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getWindowColor(
                      testWindowStatus
                    )}`}
                  >
                    {testWindowStatus}
                  </span>

                </div>

              </div>

              {/* DETAILS */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                <div>
                  <p className="text-sm text-gray-500">
                    Preferred Date
                  </p>

                  <p className="font-semibold mt-1">
                    {request.preferredDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Preferred Time
                  </p>

                  <p className="font-semibold mt-1">
                    {request.preferredTime}
                  </p>
                </div>

                {request.scheduledDate && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Scheduled Date
                    </p>

                    <p className="font-semibold text-green-600 mt-1">
                      {request.scheduledDate}
                    </p>
                  </div>
                )}

                {request.scheduledTime && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Scheduled Time
                    </p>

                    <p className="font-semibold text-green-600 mt-1">
                      {request.scheduledTime}
                    </p>
                  </div>
                )}

                {request.duration && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Duration
                    </p>

                    <p className="font-semibold mt-1">
                      {request.duration} Minutes
                    </p>
                  </div>
                )}

                {request.adminRemark && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Admin Remark
                    </p>

                    <p className="font-semibold mt-1 text-blue-700">
                      {request.adminRemark}
                    </p>
                  </div>
                )}

              </div>

              {/* ACTION SECTION */}
              {request.status === "APPROVED" &&
                request.testId && (
                  <div className="mt-8 border-t pt-6">

                    {testWindowStatus === "LIVE" ? (
                      <button
                        onClick={() =>
                          startTest(request.testId)
                        }
                        className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition duration-300"
                      >
                        Start Test
                      </button>
                    ) : (
                      <div
                        className={`inline-block px-5 py-3 rounded-xl font-semibold
                        ${
                          testWindowStatus === "UPCOMING"
                            ? "bg-yellow-100 text-yellow-700"
                            : testWindowStatus === "EXPIRED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {testWindowStatus === "UPCOMING"
                          ? "⏳ Test Not Started Yet"
                          : testWindowStatus === "EXPIRED"
                          ? "❌ Test Expired"
                          : "⌛ Waiting For Schedule"}
                      </div>
                    )}

                  </div>
                )}

            </div>
          );
        })}

      </div>
    )}
  </div>
);
};

export default StudentRequests;
