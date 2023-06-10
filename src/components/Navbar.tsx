import { useRouter } from "next/router";
import React from "react";

export const Navbar = (props) => {
  const router = useRouter();
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          <img
            src="/favicon.ico"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          FunBrain
        </a>
      </div>
    </nav>
  );
};
