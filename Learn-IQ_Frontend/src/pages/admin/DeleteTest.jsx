import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteTest = () => {

  const [tests, setTests] = useState([]);

  // Fetch All Tests
  useEffect(() => {

    fetchTests();

  }, []);

  const fetchTests = async () => {

    try {

      const response = await axios.get(
        "http://localhost:9090/tests/getall",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTests(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed To Fetch Tests");

    }
  };

  // Delete Test
  const deleteTest = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:9090/tests/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Test Deleted Successfully");

      // UI Update
      setTests(tests.filter((test) => test.id !== id));

    } catch (error) {

      console.log(error);
      alert("Failed To Delete Test");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Delete Tests
        </h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">

          <table className="w-full">

            <thead className="bg-red-500 text-white">

              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">Total Marks</th>
                <th className="p-4 text-left">Action</th>
              </tr>

            </thead>

            <tbody>

              {tests.length > 0 ? (

                tests.map((test) => (

                  <tr
                    key={test.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">{test.id}</td>

                    <td className="p-4">{test.title}</td>

                    <td className="p-4">
                      {test.duration} Minutes
                    </td>

                    <td className="p-4">
                      {test.totalMarks}
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() => deleteTest(test.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-6"
                  >
                    No Tests Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DeleteTest;