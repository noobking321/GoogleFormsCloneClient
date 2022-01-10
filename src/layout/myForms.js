import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";

import { getForms } from "../axios";
import { AuthContext } from "../context/auth";
import Loading from "../components/loading";

export default function MyForms() {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [forms, setForms] = useState([]);

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
      {loading && <Loading />}
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
