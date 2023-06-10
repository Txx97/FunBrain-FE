import { useRouter } from "next/router";
import React from "react";

export const ErrorMsg = (props) => {
  const router = useRouter();
  return (
    <div className="text-center">
      <h1 className="text-center">{props.errorCode === 404 ? "Coming Soon..." : "Something Went Wrong!!"}</h1>
      <img src="https://static.vecteezy.com/system/resources/thumbnails/002/404/326/small/happy-multi-ethnic-kids-playing-together-vector.jpg" alt="kids playing" style={{height:275, width: 590}}></img>
      <button className="btn btn-outline-secondary btn-lg btn1" onClick={() => router.push("/")}>
        Home
      </button>
    </div>
  );
};
