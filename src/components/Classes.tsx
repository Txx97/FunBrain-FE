import React, { useEffect, useState } from "react";
import { CardContainer } from "./CardContainer";
import { Constants } from "../Utils/Constants";
import axios from "axios";
import { ErrorMsg } from "./ErrorMsg";

export const Classes = (props) => {
  const [classList, setClassList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState();
  useEffect(() => {
    let config = {
      method: "get",
      url: `${Constants.API_URL}/classes`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        setIsLoading(false);
        setClassList(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorCode(error.response.status);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : errorCode ? (
        <ErrorMsg errorCode={errorCode} />
      ) : classList.length === 0 ? (
        <h3>No Classes Found</h3>
      ) : (
        <CardContainer data={classList} route={`/subjects`}/>
      )}
      <CardContainer />
    </>
  );
};
