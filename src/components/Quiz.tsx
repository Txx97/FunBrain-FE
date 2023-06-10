import React, { useEffect, useState } from "react";
import { Constants } from "../Utils/Constants";
import axios from "axios";
import { useRouter } from "next/router";
import { ErrorMsg } from "./ErrorMsg";

export const Quiz = (props) => {
  const router = useRouter();
  const chapterId = router.query.chapterId;
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState();
  const [status, setStatus] = useState();
  useEffect(() => {
    if (chapterId) {
      let config = {
        method: "get",
        url: `${Constants.API_URL}/contents?chapter=${chapterId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios(config)
        .then((response) => {
          setIsLoading(false);
          setContent(response.data.data);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorCode(error.response.status);
        });
    }
  }, [chapterId]);

  const checkAnswer = () => {
    if (content.quiz[questionIndex].ans === answer) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : errorCode ? (
        <ErrorMsg errorCode={errorCode} />
      ) : (
        <div className="container">
          <h1>Quiz</h1>
          {questionIndex === content?.quiz?.length ? (
            <>
              <div className="alert alert-primary" role="alert">
                Quiz Finished!!! Start with a new chapter
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/")}
                >
                  Home
                </button>
              </div>
              <br />
              <hr />
            </>
          ) : (
            <>
              <h3>
                Question {questionIndex + 1} / {content?.quiz?.length}
              </h3>
              <form>
                <div className="form-group">
                  <label>{content.quiz[questionIndex].question}</label>
                  <hr />
                  <select
                    className="form-control"
                    onChange={(event) => {
                      setAnswer(event.target.value);
                    }}
                    value={answer}
                  >
                    <option value="">Select Answer</option>
                    {content.quiz[questionIndex].options.map((option) => {
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <br />
                {status === "correct" ? (
                  <div className="alert alert-success" role="alert">
                    Congratulation!!! Your answer is correct.
                  </div>
                ) : status === "wrong" ? (
                  <>
                    <div className="alert alert-danger" role="alert">
                      Oops!!! This is a wrong answer
                    </div>
                    <h3>Correct Answer : {content.quiz[questionIndex].ans}</h3>
                  </>
                ) : (
                  <></>
                )}
                <div className="row">
                  <div className="col-md-3">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm col-md-3"
                      style={{ width: "200px" }}
                      onClick={() => {
                        if (status) {
                          setStatus("");
                          setAnswer("");
                          setQuestionIndex(questionIndex + 1);
                        } else {
                          checkAnswer();
                        }
                      }}
                    >
                      {status ? "Next" : "Save"}
                    </button>
                  </div>
                </div>
                <hr />
                {/* <div className="row">
              <div className="col-md-3">
                {" "}
                <button
                  type="button"
                  className="btn btn-primary btn-sm col-md-3"
                  style={{ width: "200px" }}
                  disabled={questionIndex === 0}
                  onClick={()=>{
                    setQuestionIndex(questionIndex - 1)
                  }}
                >
                  Previous
                </button>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  style={{ width: "200px" }}
                  disabled={questionIndex === content?.quiz?.length - 1}
                  onClick={()=>{
                    setQuestionIndex(questionIndex + 1)
                  }}
                >
                  Next
                </button>
              </div>
            </div> */}
                <br />
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
