import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function Home() {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user.user) {
      navigate("/myforms");
    }
  }, [user, navigate]);
  return (
    <div className="text-5xl p-20 text-center">
      <Link to="login" className="text-blue-700 hover:text-blue-500">
        Login
      </Link>{" "}
      or{" "}
      <Link to="register" className="text-blue-700 hover:text-blue-500">
        Register
      </Link>{" "}
      to make forms...
    </div>
  );
}
