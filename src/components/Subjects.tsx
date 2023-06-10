import React, { useEffect, useState } from "react";
import { CardContainer } from "./CardContainer";
import { Constants } from "../Utils/Constants";
import axios from "axios";
import { useRouter } from "next/router";
import { ErrorMsg } from "./ErrorMsg";

export const Subjects = (props) => {
  const router = useRouter();
  const { classId } = router.query;
  const [subjectList, setSubjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState();
  useEffect(() => {
    if (classId) {
      let config = {
        method: "get",
        url: `${Constants.API_URL}/subjects?class=${classId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios(config)
        .then((response) => {
          setIsLoading(false);
          setSubjectList(response.data.data);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorCode(error.response.status);
        });
    }
  }, [classId, router]);
  return (
    <>
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : errorCode ? (
        <ErrorMsg errorCode={errorCode} />
      ) : subjectList.length === 0 ? (
        <h3>No Subjects Found</h3>
      ) : (
        <CardContainer data={subjectList} route={`/subjects/${classId}/chapters`} />
      )}
      <CardContainer />
    </>
  );
};
