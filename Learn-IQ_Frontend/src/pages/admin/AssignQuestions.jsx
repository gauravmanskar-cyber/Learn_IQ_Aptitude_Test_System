import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignQuestions = () => {

  // All Tests
  const [tests, setTests] = useState([]);

  // All Questions
  const [questions, setQuestions] = useState([]);

  // Selected Test
  const [selectedTest, setSelectedTest] = useState("");

  // Selected Question IDs
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Fetch Data
  useEffect(() => {

    fetchTests();

    fetchQuestions();

  }, []);

  // Fetch Tests
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

  // Fetch Questions
  const fetchQuestions = async () => {

    try {

      const response = await axios.get(
        "https://learn-iq-backend.onrender.com/questions/getall",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setQuestions(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Checkbox Select
  const handleQuestionSelect = (questionId) => {

    if (selectedQuestions.includes(questionId)) {

      setSelectedQuestions(
        selectedQuestions.filter((id) => id !== questionId)
      );

    } else {

      setSelectedQuestions([
        ...selectedQuestions,
        questionId,
      ]);

    }
  };

  // Assign Questions
  const assignQuestions = async () => {

    if (!selectedTest) {

      alert("Please Select Test");

      return;
    }

    if (selectedQuestions.length === 0) {

      alert("Please Select Questions");

      return;
    }

    try {

      const payload = {

        testId: selectedTest,

        questionIds: selectedQuestions,

      };

      console.log(payload);

      await axios.post(
        "https://learn-iq-backend.onrender.com/test-question/assign",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Questions Assigned Successfully");

      setSelectedQuestions([]);

      setSelectedTest("");

    } catch (error) {

      console.log(error);

      alert("Failed To Assign Questions");

    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-white">
          Assign Questions To Test
        </h1>

        <p className="text-gray-300 mt-2">
          Select a test and assign questions from question bank
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-1">

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Select Test
            </h2>

            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              className="w-full border-2 border-gray-200 p-4 rounded-2xl focus:border-cyan-500 outline-none"
            >
              <option value="">
                -- Select Test --
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

            <div className="mt-6 bg-cyan-50 rounded-2xl p-5">

              <h3 className="font-bold text-cyan-700">
                Selected Questions
              </h3>

              <p className="text-4xl font-bold text-cyan-600 mt-2">
                {selectedQuestions.length}
              </p>

            </div>

            <button
              onClick={assignQuestions}
              className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:scale-105 transition-all"
            >
              Assign Questions
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-3xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-gray-800">
                Question Bank
              </h2>

              <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-xl font-semibold">
                {questions.length} Questions
              </span>

            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto">

              {questions.map((question) => (

                <div
                  key={question.id}
                  className={`border-2 rounded-2xl p-5 transition-all cursor-pointer ${
                    selectedQuestions.includes(question.id)
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-gray-200 hover:border-cyan-300"
                  }`}
                >

                  <div className="flex gap-4">

                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(question.id)}
                      onChange={() =>
                        handleQuestionSelect(question.id)
                      }
                      className="h-5 w-5 mt-1"
                    />

                    <div className="flex-1">

                      <div className="flex justify-between items-start">

                        <h3 className="font-bold text-gray-800 text-lg">
                          {question.questionText}
                        </h3>

                        <div className="flex gap-2">

                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-semibold">
                            {question.category}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                              question.difficulty === "Easy"
                                ? "bg-green-100 text-green-700"
                                : question.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {question.difficulty}
                          </span>

                        </div>

                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mt-4">

                        <div className="bg-gray-50 p-3 rounded-xl">
                          <span className="font-bold text-blue-600">
                            A.
                          </span>{" "}
                          {question.optionA}
                        </div>

                        <div className="bg-gray-50 p-3 rounded-xl">
                          <span className="font-bold text-blue-600">
                            B.
                          </span>{" "}
                          {question.optionB}
                        </div>

                        <div className="bg-gray-50 p-3 rounded-xl">
                          <span className="font-bold text-blue-600">
                            C.
                          </span>{" "}
                          {question.optionC}
                        </div>

                        <div className="bg-gray-50 p-3 rounded-xl">
                          <span className="font-bold text-blue-600">
                            D.
                          </span>{" "}
                          {question.optionD}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
);
};

export default AssignQuestions;