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

      const payload = {
        userId: 4,
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
    return <h1 className="p-5">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-2">Test Started</h1>

        <h2 className="text-xl text-green-700 mb-5">{test.description}</h2>
      {score === null && ( 
        <>
        {/* QUESTIONS */}
        <div className="space-y-5">
          {test.testQuestion.map((item, index) => (
            <div key={item.id} className="border p-4 rounded-lg">
              <h2 className="font-bold mb-3">
                Q{index + 1}. {item.question.questionText}
              </h2>

              <div className="space-y-2">
                {/* OPTION A */}
                <label className="block">
                  <input
                    type="radio"
                    name={`question-${item.question.id}`}
                    value="A"
                    onChange={(e) =>
                      handleOptionChange(item.question.id, e.target.value)
                    }
                  />

                  <span className="ml-2">{item.question.optionA}</span>
                </label>

                {/* OPTION B */}
                <label className="block">
                  <input
                    type="radio"
                    name={`question-${item.question.id}`}
                    value="B"
                    onChange={(e) =>
                      handleOptionChange(item.question.id, e.target.value)
                    }
                  />

                  <span className="ml-2">{item.question.optionB}</span>
                </label>

                {/* OPTION C */}
                <label className="block">
                  <input
                    type="radio"
                    name={`question-${item.question.id}`}
                    value="C"
                    onChange={(e) =>
                      handleOptionChange(item.question.id, e.target.value)
                    }
                  />

                  <span className="ml-2">{item.question.optionC}</span>
                </label>

                {/* OPTION D */}
                <label className="block">
                  <input
                    type="radio"
                    name={`question-${item.question.id}`}
                    value="D"
                    onChange={(e) =>
                      handleOptionChange(item.question.id, e.target.value)
                    }
                  />

                  <span className="ml-2">{item.question.optionD}</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          className="bg-green-700 text-white px-6 py-3 rounded-lg mt-6"
        >
          Submit Test
        </button>

        </> 
      )}
        

        {/* RESULT */}
        {score !== null && (
          <div className="mt-6 bg-blue-100 p-5 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-700">
              Test Submitted Successfully
            </h2>

            <p className="text-xl mt-2">
              Your Score: {score}
              {" / "}
              {test.testQuestion.length}
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Question Wise Result</h2>

            {results.map((result, index) => (
              <div
                key={result.questionId}
                className={`p-4 rounded-lg mb-4 border-2 ${
                  result.correct
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                }`}
              >
                <h3 className="font-bold text-lg">
                  Q{index + 1}. {result.questionText}
                </h3>

                <p className="mt-2">
                  <strong>Your Answer:</strong>{" "}
                  {result.selectedAnswer || "Not Answered"}
                </p>

                <p>
                  <strong>Correct Answer:</strong> {result.correctAnswer}
                </p>

                <p className="mt-2 font-bold">
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
