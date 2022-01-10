import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { AiFillFileAdd } from "react-icons/ai";

import { getForms } from "../axios";
import { AuthContext } from "../context/auth";

export default function MyForms() {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  console.log(forms);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user.user) {
      navigate("../login");
    } else {
      setLoading(true);
      getForms()
        .then((res) => {
          setLoading(false);
          setForms(res.data.forms);
        })
        .catch(() => {
          setLoading(false);
          alert("Error");
        });
    }
  }, [user, navigate]);
  return (
    <>
      {" "}
      {loading && (
        <div className="w-full h-full fixed block top-0 left-0 bg-black opacity-75 z-50">
          <span
            className="text-white top-1/2 my-0 mx-auto block relative w-0 h-0"
            style={{ top: "50%" }}
          >
            <ImSpinner2 className="animate-spin text-5xl" />
          </span>
        </div>
      )}
      {forms && (
        <>
          <div className="text-4xl mx-20 my-10">My forms</div>
          <div className="md:flex flex-wrap">
            <div
              className="bg-amber-100 border-2 border-slate-700 p-24 m-12 rounded-md drop-shadow-lg w-64"
              key={0}
            >
              <Link className="text-6xl" to={"../createform/"}>
                <AiFillFileAdd />
              </Link>
            </div>
            {forms.map((val, i) => {
              return (
                <div
                  className="bg-amber-100 border-2 border-slate-700 p-5 m-12 rounded-md drop-shadow-lg py-10 w-64"
                  key={i + 1}
                >
                  <div className="text-3xl mb-10">
                    <Link to={`../viewform/${val._id}`}>{val.name}</Link>
                  </div>
                  <div className="text-2xl">
                    <Link
                      to={`../responses/${val._id}`}
                      className="text-blue-700 hover:text-blue-500"
                    >
                      {`${val.responses.length} Responses`}
                      
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
