import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSun, FaMoon } from "react-icons/fa";

import { AuthContext } from "../context/auth";

export default function Navigationbar() {
  const html = document.querySelector("html");
  if (localStorage.getItem("darkMode")) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  const user = useContext(AuthContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));
  const change_dark_mode = () => {
    const html = document.querySelector("html");
    if (darkMode) {
      localStorage.removeItem("darkMode", true);
      html.classList.remove("dark");
      setDarkMode(false);
    } else {
      localStorage.setItem("darkMode", true);
      html.classList.add("dark");
      setDarkMode(true);
    }
  };
  const navbars = user.user ? (
    <li className="nav-item">
      <button
        onClick={user.logout}
        className="px-3 pr-6 mx-2 py-2 flex items-center uppercase font-bold leading-snug text-white text-xl hover:bg-blue-600 rounded-full"
      >
        <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
        <span className="ml-2">Logout</span>
      </button>
    </li>
  ) : (
    <>
      <li className="nav-item">
        <Link
          className="px-3 pr-6 mx-2 py-2 flex items-center uppercase font-bold leading-snug text-white text-xl hover:bg-blue-600 rounded-full"
          to="login"
        >
          <span className="ml-2">Login</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="register"
          className="px-3 pr-6 mx-2 py-2 flex items-center uppercase font-bold leading-snug text-white text-xl hover:bg-blue-600 rounded-full"
        >
          <span className="ml-2">Register</span>
        </Link>
      </li>
    </>
  );
  return (
    <nav className="flex flex-wrap items-center justify-between px-5 py-5 bg-blue-500 dark:bg-slate-800 mb-3 shadow-xl border-slate-700 sticky top-0 z-10">
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
            <li className="nav-item mx-2">
              <button className="hover:bg-blue-600 rounded-full" onClick={change_dark_mode}>{darkMode ? <FaSun className="text-white m-3 text-xl" /> : <FaMoon className="text-white m-3 text-xl"/>} </button>
            </li>
            {navbars}
          </ul>
        </div>
      </div>
    </nav>
  );
}
