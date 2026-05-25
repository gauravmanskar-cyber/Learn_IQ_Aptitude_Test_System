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
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Manage Question Bank
        </h1>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* LEFT SIDE FORM */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold mb-5">

              {editId ? "Edit Question" : "Add New Question"}

            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* QUESTION */}
              <textarea
                name="questionText"
                placeholder="Enter Question"
                value={questionData.questionText}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                rows="3"
                required
              />

              {/* OPTION A */}
              <input
                type="text"
                name="optionA"
                placeholder="Option A"
                value={questionData.optionA}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              {/* OPTION B */}
              <input
                type="text"
                name="optionB"
                placeholder="Option B"
                value={questionData.optionB}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              {/* OPTION C */}
              <input
                type="text"
                name="optionC"
                placeholder="Option C"
                value={questionData.optionC}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              {/* OPTION D */}
              <input
                type="text"
                name="optionD"
                placeholder="Option D"
                value={questionData.optionD}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              {/* CORRECT ANSWER */}
              <input
                type="text"
                name="correctAnswer"
                placeholder="Correct Answer"
                value={questionData.correctAnswer}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              {/* DIFFICULTY */}
              <select
                name="difficulty"
                value={questionData.difficulty}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              {/* CATEGORY */}
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={questionData.category}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              {/* BUTTON */}
              <button
                type="submit"
                className={`w-full text-white p-3 rounded-lg transition ${
                  editId
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {editId ? "Update Question" : "Add Question"}
              </button>

            </form>
          </div>

          {/* RIGHT SIDE TABLE */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold mb-5">
              All Questions
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-indigo-100">

                    <th className="p-3 text-left">
                      Question
                    </th>

                    <th className="p-3 text-left">
                      Category
                    </th>

                    <th className="p-3 text-left">
                      Difficulty
                    </th>

                    <th className="p-3 text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {questions.length > 0 ? (

                    questions.map((item) => (

                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-3">
                          {item.questionText}
                        </td>

                        <td className="p-3">
                          {item.category}
                        </td>

                        <td className="p-3">
                          {item.difficulty}
                        </td>

                        <td className="p-3">

                          <div className="flex gap-2 justify-center">

                            {/* EDIT */}
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                            >
                              Edit
                            </button>

                            {/* DELETE */}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
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
                        className="text-center p-5 text-gray-500"
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