import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

import { loginUser } from "../axios";
import { AuthContext } from "../context/auth";

export default function Login() {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user.user) {
      navigate("../");
    }
  }, [user, navigate]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    loginUser({ username, password })
      .then((res) => {
        if (res.data.success) {
          user.login(res.data.token);
          navigate("../");
        }
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        Object.keys(err.response.data.errors).map((val) => {
          document.getElementById(val).classList.remove("border-slate-800");
          return document.getElementById(val).classList.add("border-red-400");
        });
        setLoading(false);
      });
  };
  return (
    <div className="md:flex flex-col items-center p-5">
      <div className=" bg-white border-2 border-slate-700 m-5 rounded-md drop-shadow-lg px-52 py-20">
        <div className="text-3xl ml-5">Login</div>
        <br />
        <form>
          <input
            className="m-2 md:mr-10 text-l border border-slate-800 rounded-md p-3 text-slate-800 outline-0 focus:outline-2 focus:shadow-lg w-96"
            placeholder="Username"
            type="username"
            value={username}
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {errors && (
            <>
              <br />
              <div className="ml-5 text-red-500">{errors.username}</div>
            </>
          )}
          <br />
          <input
            className="m-2 md:mr-10 text-l border border-slate-800 rounded-md p-3 text-slate-800 outline-0 focus:outline-2 focus:shadow-lg w-96"
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors && (
            <>
              <br />
              <div className="ml-5 text-red-500">{errors.password}</div>
            </>
          )}
          <br />
          <button
            className="m-5 ml-20 rounded-lg bg-blue-300 hover:shadow-lg border-2 border-slate-700 text-slate-900 w-32 h-10"
            onClick={submit}
            type="submit"
          >
            {loading ? (
              <ImSpinner2 className="animate-spin text-xl mx-12" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
