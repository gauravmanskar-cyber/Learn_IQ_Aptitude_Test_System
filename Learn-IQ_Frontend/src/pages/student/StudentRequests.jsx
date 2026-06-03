import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:9090/request-test/my-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-3xl font-bold text-center">
          My Test Requests
        </h1>
      </div>

      {loading ? (
        <div className="text-center text-lg">
          Loading...
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center text-red-500">
          No Requests Found
        </div>
      ) : (
        <div className="grid gap-5">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    {request.testName}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {request.description}
                  </p>
                </div>

                <div>
                  <span
                    className={`font-bold ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <p className="font-semibold">
                    Preferred Date
                  </p>

                  <p>{request.preferredDate}</p>
                </div>

                <div>
                  <p className="font-semibold">
                    Preferred Time
                  </p>

                  <p>{request.preferredTime}</p>
                </div>

                {request.scheduledDate && (
                  <div>
                    <p className="font-semibold text-green-700">
                      Scheduled Date
                    </p>

                    <p>{request.scheduledDate}</p>
                  </div>
                )}

                {request.scheduledTime && (
                  <div>
                    <p className="font-semibold text-green-700">
                      Scheduled Time
                    </p>

                    <p>{request.scheduledTime}</p>
                  </div>
                )}

                {request.duration && (
                  <div>
                    <p className="font-semibold">
                      Duration
                    </p>

                    <p>{request.duration} Minutes</p>
                  </div>
                )}

                {request.adminRemark && (
                  <div>
                    <p className="font-semibold">
                      Admin Remark
                    </p>

                    <p>{request.adminRemark}</p>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentRequests;