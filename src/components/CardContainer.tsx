import React from "react";
import { Card } from "./Card";

export const CardContainer = (props) => {
  const dataList = props?.data;

  return (
    <div className="container mt-5 mb-3">
      <div className="row">
        {Array.isArray(dataList) ? (
          dataList?.map((data) => {
            return (
              <Card
                route={props.route}
                key={data.id}
                title={data.name}
                id={data.id}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
