import React, { useEffect, useState } from "react";
import { Constants } from "../Utils/Constants";
import axios from "axios";
import { useRouter } from "next/router";
import { ErrorMsg } from "./ErrorMsg";

export const Contents = (props) => {
  const router = useRouter();
  const chapterId = router.query.chapterId;
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState();
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

  console.log(content);
  
  return (
    <>
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : errorCode ? (
        <ErrorMsg errorCode={errorCode} />
      ) : (
        <>
          <div className="container-fluid">
            <h1>{content.title}</h1>
            <div className="row">
              <div className="col-md-3 fixed-left one">
                <div id="list-example" className="list-group">
                  {content.sections.map((section, i) => {
                    return (
                      <a
                        className="list-group-item list-group-item-action"
                        href={`#list-${section.title}`}
                        key={i}
                      >
                        {section.title}
                      </a>
                    );
                  })}
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={()=>router.push(`/quiz/${chapterId}`)}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
              <div className="col-md-9">
                <div
                  data-spy="scroll"
                  data-target="#list-example"
                  data-offset="0"
                  className="scrollspy-example"
                >
                  {content.sections?.map((section, i) => {
                    return (
                      <div className="card p-3 mb-2" key={i}>
                        <h4 id={`list-${section.title}`}>{section.title}</h4>

                        {section.items?.map((item, i) => {
                          if (item.type === "video") {
                            return (
                              <div key={i}>
                                <iframe
                                  width="600"
                                  height="450"
                                  src={item.url}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                ></iframe>
                                <hr />
                              </div>
                            );
                          } else if (item.type === "text") {
                            return item.text?.map((t, i) => {
                              return <p key={i}>{t}</p>;
                            });
                          } else if (item.type === "img") {
                            return (
                              <img
                                src={item.url}
                                width="500"
                                height="333"
                                alt={item.text}
                              ></img>
                            );
                          }
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
