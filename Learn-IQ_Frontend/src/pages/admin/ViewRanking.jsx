import { useEffect, useState } from "react";
import axios from "axios";

function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      const response = await axios.get(
        "https://learn-iq-backend.onrender.com/attempt/rankings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setRankings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 p-6">

    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white rounded-3xl shadow-xl p-8 mb-8">

        <h1 className="text-4xl font-bold">
          🏆 Student Rankings
        </h1>

        <p className="text-cyan-100 mt-2">
          Top performing students leaderboard
        </p>

      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="p-6 border-b bg-gray-50">

          <h2 className="text-2xl font-bold text-gray-800">
            Leaderboard
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">

                <th className="p-4 text-left">
                  Rank
                </th>

                <th className="p-4 text-left">
                  Student Name
                </th>

                <th className="p-4 text-left">
                  Score
                </th>

              </tr>

            </thead>

            <tbody>

              {rankings.length > 0 ? (

                rankings.map((student, index) => (

                  <tr
                    key={student.userId}
                    className="border-b hover:bg-blue-50 transition"
                  >

                    <td className="p-4 font-bold text-lg">

                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : `#${index + 1}`}

                    </td>

                    <td className="p-4 font-semibold text-gray-800">
                      {student.studentName}
                    </td>

                    <td className="p-4">

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                        {student.score}
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center p-10 text-gray-500"
                  >
                    No Ranking Data Available
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

export default Rankings;
