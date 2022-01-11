import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsCheck } from "react-icons/bs";

import { getForm, postResponse } from "../axios";
import FormName from "../components/fillForm/formName";
import Card from "../components/fillForm/card";
import Loading from "../components/loading";
import Submitted from "../components/fillForm/submitted";

export default function FillForm() {
  var { formId } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submited, setSubmited] = useState(false);
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
  const submit = () => {
    setLoading(true);
    postResponse(formId, response)
      .then(() => {
        setLoading(false);
        setSubmited(true);
        setResponse(new Array(data.questions.length).fill(null));
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.error);
      });
  };
  return (
    <>
      {loading && <Loading />}
      {data && (
        <>
          <div className="md:flex flex-col items-center p-5">
            <FormName formName={data.name} />
            {submited ? (
              <Submitted
                msg="Your response has been recorded."
                setSubmited={setSubmited}
              />
            ) : (
              data.questions.map((val, i) => {
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
              })
            )}
          </div>
          {!submited && (
            <div className="fixed bottom-8 right-8 md:bottom-20 md:right-20">
              <button
                className="text-4xl md:text-5xl drop-shadow-lg"
                onClick={submit}
              >
                <BsCheck className="rounded-full border-2 border-slate-700 bg-white dark:bg-slate-700 dark:text-white drop-shadow-xl" />
              </button>
            </div>
          )}
        </>
      )}
      {error && <div className="text-5xl px-24 py-12">{error}</div>}
    </>
  );
}
