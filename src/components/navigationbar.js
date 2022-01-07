import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { AuthContext } from "../context/auth";

export default function Navigationbar() {
  const user = useContext(AuthContext);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const navbars = user.user ? (
    <li className="nav-item">
      <button
        onClick={user.logout}
        className="px-3 py-2 flex items-center uppercase font-bold leading-snug text-white hover:opacity-75 text-xl"
      >
        <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
        <span className="ml-2">Logout</span>
      </button>
    </li>
  ) : (
    <>
      <li className="nav-item">
        <Link
          className="px-3 py-2 flex items-center uppercase font-bold leading-snug text-white hover:opacity-75 text-xl"
          to="login"
        >
          <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
          <span className="ml-2">Login</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="register"
          className="px-3 py-2 flex items-center uppercase font-bold leading-snug text-white hover:opacity-75 text-xl"
        >
          <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
          <span className="ml-2">Register</span>
        </Link>
      </li>
    </>
  );
  return (
    <nav className="flex flex-wrap items-center justify-between px-5 py-5 bg-blue-500 mb-3 shadow-xl border-slate-700 sticky top-0 z-10">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full sticky flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            to="/"
            className="font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white text-2xl"
          >
            Google Forms
          </Link>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {<GiHamburgerMenu className="text-2xl" />}
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {navbars}
          </ul>
        </div>
      </div>
    </nav>
  );
}
