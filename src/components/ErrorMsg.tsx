import { useRouter } from "next/router";
import React from "react";

export const ErrorMsg = (props) => {
  const router = useRouter();
  return (
    <div className="text-center">
      <h1 className="text-center">{props.errorCode === 404 ? "Coming Soon..." : "Something Went Wrong!!"}</h1>
      <button className="btn btn-primary" onClick={() => router.push("/")}>
        Home
      </button>
    </div>
  );
};
