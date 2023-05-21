import React from "react";
import { Link } from "react-scroll";
import NavbarLink from "./NavbarLinks";
("./NavLink");
import "./navbar.style.css";
function Navbar() {
  return (
    <nav
      className={`nav w-full md:w-[90%] m-auto px-2 py-1 flex items-center
       justify-between top-0  z-50 fixed bg-[#fcfcfc] border-b`}
    >
      <Link to="/" className="text-4xl font-semibold text-lochmara-800">
        KG
      </Link>
      <NavbarLink />
    </nav>
  );
}

export default Navbar;
