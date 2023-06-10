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
            src="https://www.vhv.rs/dpng/d/569-5693201_cartoon-brain-png-cute-brain-clipart-transparent-png.png"
            alt="Logo"
            width="80"
            height="80"
            className="d-inline-block align-text-top"
          />
          {/* <i class="fa-duotone fa-brain"></i> */}
          FunBrains
        </a>
      </div>
    </nav>
  );
};
