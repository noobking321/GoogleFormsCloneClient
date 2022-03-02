import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import { getForms, deleteForm, enableForm } from "../axios";
import { AuthContext } from "../context/auth";
import Loading from "../components/loading";
import config from "../config";

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
        .catch((err) => {
          if (err.response) {
            alert(err.response.data.error);
          } else {
            alert(config.severOfflineMsg);
          }
          setLoading(false);
        });
    }
  }, [user, navigate]);
  const enable = (e) => {
    setLoading(true);
    const i = e.target.getAttribute("index");
    var action = "enable";
    if (forms[i].enabled) {
      action = "disable";
    }
    enableForm(forms[i]._id, action)
      .then(() => {
        var new_forms = Array.from(forms);
        new_forms[i].enabled = !new_forms[i].enabled;
        setForms(new_forms);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const delete_form = (i) => {
    setLoading(true);
    deleteForm(forms[i]._id)
      .then(() => {
        var new_forms = Array.from(forms)
        new_forms.splice(i, 1)
        setForms(new_forms);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <>
      {loading && <Loading />}
      {forms && (
        <>
          <div className="text-4xl mx-10 md:mx-52 my-10 dark:text-white">
            My forms
          </div>
          <div className="md:flex flex-wrap md:mx-40">
            <div
              className="bg-amber-100 border-2 border-slate-700 p-24 m-12 rounded-md drop-shadow-lg w-64 dark:text-white dark:bg-slate-700"
              key={0}
            >
              <Link className="text-6xl" to={"../createform/"}>
                <AiFillFileAdd />
              </Link>
            </div>
            {forms.map((val, i) => {
              return (
                <div
                  className="bg-amber-100 border-2 border-slate-700 p-5 m-12 rounded-md drop-shadow-lg py-10 w-64 dark:text-white dark:bg-slate-700 h-64"
                  key={i + 1}
                >
                  <div className="text-3xl mb-8 max-h-[77px] overflow-y-hidden">
                    <Link to={`../viewform/${val._id}`}>{val.name}</Link>
                  </div>
                  <div className="text-2xl mb-8">
                    <Link
                      to={`../responses/${val._id}`}
                      className="text-blue-700 hover:text-blue-500 dark:text-blue-300"
                    >
                      {`${val.responses.length} Responses`}
                    </Link>
                  </div>
                  <div className="flex items-center justify-center w-full mb-12 mx-8">
                    <label
                      htmlFor={`toggle_${i}`}
                      className="flex-1 items-center cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          id={`toggle_${i}`}
                          index={i}
                          type="checkbox"
                          className="sr-only"
                          checked={val.enabled}
                          onClick={enable}
                        />
                        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
                        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition" />
                      </div>
                    </label>
                    <button
                      className="flex-1 text-2xl"
                      index={i}
                      onClick={() => {
                        delete_form(i);
                      }}
                    >
                      <FaTrash />
                    </button>
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
