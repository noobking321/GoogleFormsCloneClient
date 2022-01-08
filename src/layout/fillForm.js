import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { getForm, postResponse } from "../axios";
import FormName from "../components/fillForm/formName";
import Card from "../components/fillForm/card";

export default function FillForm(props) {
  var { formId } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (formId) {
      getForm(formId)
        .then((res) => {
          setLoading(false);
          setData(res.data);
          setResponse(new Array(res.data.questions.length).fill(null));
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.error);
        });
    }
  }, [formId]);
  const submit = (e) => {
    setLoading(true);
    postResponse(formId, response)
      .then(() => {
        setLoading(false);
        alert("Your response has been recorded.");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.error);
      });
  };
  return (
    <>
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
      {data && (
        <>
          <div className="md:flex flex-col items-center p-5">
            <FormName formName={data.name} />
            {data.questions.map((val, i) => {
              return (
                <Card
                  i={i}
                  response={response}
                  setResponse={setResponse}
                  question={val.question}
                  type={val.type}
                  options={val.options}
                />
              );
            })}
          </div>
          <div className="fixed bottom-8 right-8 md:bottom-20 md:right-20">
            <div className="flex">
              <button
                className="text-4xl md:text-5xl m-auto drop-shadow-lg"
                onClick={submit}
              >
                <BsFillCheckCircleFill />
              </button>
            </div>
          </div>
        </>
      )}
      {error && <div className="text-5xl px-24 py-12">{error}</div>}
    </>
  );
}
