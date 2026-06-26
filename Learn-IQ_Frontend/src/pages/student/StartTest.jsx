import React, { useEffect, useState } from "react";
import axios from "axios";
import { data, useParams } from "react-router-dom";

const StartTest = () => {
  const { id } = useParams();

  const [test, setTest] = useState(null);

  const [answers, setAnswers] = useState({});

  const [score, setScore] = useState(null);

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/tests/${id}`);

      setTest(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // STORE ANSWERS
  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  // SUBMIT TEST
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      console.log("Submitting UserId =", userId);

      const payload = {
        userId: userId,
        testId: id,
        answers: answers,
      };

      const response = await axios.post(
        "http://localhost:9090/attempt/submit-test",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setScore(response.data.score);
      setResults(response.data.results);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-2xl font-bold text-blue-700">Loading Test...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white rounded-3xl shadow-xl p-8 mb-8">
        <h1 className="text-4xl font-bold">Start Test</h1>

        <p className="mt-2 text-cyan-100">
          Read each question carefully before submitting.
        </p>
      </div>

      {/* TEST CARD */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800">{test.title}</h2>

        <p className="text-blue-700 text-lg mt-2">{test.description}</p>

        {/* QUESTIONS */}
        {score === null && (
          <>
            <div className="space-y-6 mt-8">
              {test.testQuestion.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-r from-indigo-50 to-cyan-50 border-l-8 border-blue-600 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <h2 className="font-semibold text-xl text-gray-800">
                      {item.question.questionText}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name={`question-${item.question.id}`}
                        value="A"
                        onChange={(e) =>
                          handleOptionChange(item.question.id, e.target.value)
                        }
                        className="w-5 h-5 accent-blue-600"
                      />

                      <span className="ml-4 text-gray-700 font-medium">
                        {item.question.optionA}
                      </span>
                    </label>

                    <label className="flex items-center p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name={`question-${item.question.id}`}
                        value="B"
                        onChange={(e) =>
                          handleOptionChange(item.question.id, e.target.value)
                        }
                        className="w-5 h-5 accent-blue-600"
                      />

                      <span className="ml-4 text-gray-700 font-medium">
                        {item.question.optionB}
                      </span>
                    </label>

                    <label className="flex items-center p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name={`question-${item.question.id}`}
                        value="C"
                        onChange={(e) =>
                          handleOptionChange(item.question.id, e.target.value)
                        }
                        className="w-5 h-5 accent-blue-600"
                      />

                      <span className="ml-4 text-gray-700 font-medium">
                        {item.question.optionC}
                      </span>
                    </label>

                    <label className="flex items-center p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name={`question-${item.question.id}`}
                        value="D"
                        onChange={(e) =>
                          handleOptionChange(item.question.id, e.target.value)
                        }
                        className="w-5 h-5 accent-blue-600"
                      />

                      <span className="ml-4 text-gray-700 font-medium">
                        {item.question.optionD}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
              >
                Submit Test
              </button>
            </div>
          </>
        )}

        {/* RESULT SUMMARY */}
        {score !== null && (
          <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 p-6 rounded-2xl">
            <h2 className="text-3xl font-bold text-green-700">
              Test Submitted Successfully 🎉
            </h2>

            <p className="text-xl mt-3 font-semibold">
              Your Score : {score} / {test.testQuestion.length}
            </p>
          </div>
        )}

        {/* QUESTION WISE RESULT */}
        {results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-6">Question Wise Result</h2>

            {results.map((result, index) => (
              <div
                key={result.questionId}
                className={`p-6 rounded-2xl mb-5 border-2 shadow-sm ${
                  result.correct
                    ? "bg-green-50 border-green-400"
                    : "bg-red-50 border-red-400"
                }`}
              >
                <h3 className="font-bold text-lg">
                  Q{index + 1}. {result.questionText}
                </h3>

                <p className="mt-3">
                  <strong>Your Answer:</strong>{" "}
                  {result.selectedAnswer || "Not Answered"}
                </p>

                <p className="mt-1">
                  <strong>Correct Answer:</strong> {result.correctAnswer}
                </p>

                <p className="mt-3 font-bold text-lg">
                  {result.correct ? (
                    <span className="text-green-700">✅ Correct</span>
                  ) : (
                    <span className="text-red-700">❌ Wrong</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default StartTest;
