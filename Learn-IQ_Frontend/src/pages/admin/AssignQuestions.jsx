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

    }
  };

  // Fetch Questions
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
        "http://localhost:9090/test-question/assign",
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
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-cyan-700 mb-8">
          Assign Questions To Test
        </h1>

        {/* Select Test */}
        <div className="mb-8">

          <label className="block text-lg font-semibold mb-3">
            Select Test
          </label>

          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-cyan-500"
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

        </div>

        {/* Questions */}
        <div>

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Select Questions
          </h2>

          <div className="space-y-4 max-h-[500px] overflow-y-auto">

            {questions.map((question) => (

              <div
                key={question.id}
                className="border border-gray-200 rounded-xl p-4 flex gap-4 items-start hover:bg-gray-50"
              >

                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() =>
                    handleQuestionSelect(question.id)
                  }
                  className="mt-1 h-5 w-5"
                />

                <div>

                  <p className="font-semibold text-gray-800">
                    {question.questionText}
                  </p>

                  <div className="text-sm text-gray-600 mt-2 space-y-1">

                    <p>A. {question.optionA}</p>

                    <p>B. {question.optionB}</p>

                    <p>C. {question.optionC}</p>

                    <p>D. {question.optionD}</p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Button */}
        <div className="mt-8">

          <button
            onClick={assignQuestions}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Assign Questions
          </button>

        </div>

      </div>
    </div>
  );
};

export default AssignQuestions;