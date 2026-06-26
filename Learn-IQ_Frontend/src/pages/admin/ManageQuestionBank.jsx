import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageQuestionBank = () => {

  // =========================
  // FORM STATE
  // =========================
  const [questionData, setQuestionData] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    difficulty: "",
    category: "",
  });

  // =========================
  // ALL QUESTIONS
  // =========================
  const [questions, setQuestions] = useState([]);

  // =========================
  // EDIT ID
  // =========================
  const [editId, setEditId] = useState(null);

  // =========================
  // FETCH QUESTIONS
  // =========================
  useEffect(() => {

    fetchQuestions();

  }, []);

  const fetchQuestions = async () => {

    try {

      const response = await axios.get(
        "http://localhost:9090/questions/getall",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

      setQuestions(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed To Fetch Questions");
    }
  };

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {

    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD / UPDATE QUESTION
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // UPDATE
      if (editId !== null) {

        await axios.put(
          `http://localhost:9090/questions/update/${editId}`,
          questionData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        alert("Question Updated Successfully");

      } else {

        // ADD
        await axios.post(
          "http://localhost:9090/questions/add",
          questionData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        alert("Question Added Successfully");
      }

      // REFRESH QUESTIONS
      fetchQuestions();

      // CLEAR FORM
      setQuestionData({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        difficulty: "",
        category: "",
      });

      setEditId(null);

    } catch (error) {

      console.log(error);

      alert("Operation Failed");
    }
  };

  // =========================
  // DELETE QUESTION
  // =========================
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:9090/questions/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchQuestions();

      alert("Question Deleted Successfully");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  // =========================
  // EDIT QUESTION
  // =========================
  const handleEdit = (question) => {

    setQuestionData({
      questionText: question.questionText,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
      difficulty: question.difficulty,
      category: question.category,
    });

    setEditId(question.id);
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">

    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white rounded-3xl shadow-xl p-8 mb-8">

        <h1 className="text-4xl font-bold">
          Manage Question Bank
        </h1>

        <p className="text-cyan-100 mt-2">
          Create, update and manage all aptitude questions
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* FORM SECTION */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5">

            <h2 className="text-2xl font-bold">
              {editId ? "Update Question" : "Add New Question"}
            </h2>

          </div>

          <div className="p-6">

            <form onSubmit={handleSubmit} className="space-y-4">

              <textarea
                name="questionText"
                placeholder="Enter Question"
                value={questionData.questionText}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
                required
              />

              <input
                type="text"
                name="optionA"
                placeholder="Option A"
                value={questionData.optionA}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <input
                type="text"
                name="optionB"
                placeholder="Option B"
                value={questionData.optionB}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <input
                type="text"
                name="optionC"
                placeholder="Option C"
                value={questionData.optionC}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <input
                type="text"
                name="optionD"
                placeholder="Option D"
                value={questionData.optionD}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="correctAnswer"
                  placeholder="Correct Answer (A/B/C/D)"
                  value={questionData.correctAnswer}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />

                <select
                  name="difficulty"
                  value={questionData.difficulty}
                  onChange={handleChange}
                  className="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

              </div>

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={questionData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <button
                type="submit"
                className={`w-full text-white py-4 rounded-xl font-bold text-lg transition duration-300 ${
                  editId
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:scale-105"
                    : "bg-gradient-to-r from-indigo-600 to-cyan-500 hover:scale-105"
                }`}
              >
                {editId ? "Update Question" : "Add Question"}
              </button>

            </form>

          </div>

        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5">

            <h2 className="text-2xl font-bold">
              All Questions
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="bg-blue-50">

                  <th className="p-4 text-left">Question</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Difficulty</th>
                  <th className="p-4 text-center">Actions</th>

                </tr>
              </thead>

              <tbody>

                {questions.length > 0 ? (

                  questions.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-blue-50 transition"
                    >

                      <td className="p-4 max-w-xs">
                        {item.questionText}
                      </td>

                      <td className="p-4">
                        <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">
                          {item.category}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          {item.difficulty}
                        </span>
                      </td>

                      <td className="p-4">

                        <div className="flex gap-2 justify-center">

                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center p-10 text-gray-500"
                    >
                      No Questions Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default ManageQuestionBank;