import React, { useEffect, useState } from "react";
import { CardContainer } from "./CardContainer";
import { Constants } from "../Utils/Constants";
import axios from "axios";
import { useRouter } from "next/router";
import { ErrorMsg } from "./ErrorMsg";

export const Chapters = (props) => {
  const router = useRouter();
  const { classId, subjectId } = router.query;
  const [chapterList, setChapterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState();
  useEffect(() => {
    if (subjectId) {
      let config = {
        method: "get",
        url: `${Constants.API_URL}/chapters?subject=${subjectId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios(config)
        .then((response) => {
          setIsLoading(false);
          setChapterList(response.data.data);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorCode(error.response.status);
        });
    }
  }, [subjectId]);
  return (
    <>
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : errorCode ? (
        <ErrorMsg errorCode={errorCode} />
      ) : chapterList.length === 0 ? (
        <h3>No Chapters Found</h3>
      ) : (
        <CardContainer data={chapterList} route={`/subjects/${classId}/chapters/${subjectId}/contents`} />
      )}
      <CardContainer />
    </>
  );
};
