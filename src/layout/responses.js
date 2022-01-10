import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getResponses } from "../axios";
import ResponseTable from "../components/responseTable";
import Loading from "../components/loading";

export default function Responses() {
  var { formId } = useParams();
  const [questions, setQuestions] = useState();
  const [responses, setResponses] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (formId) {
      getResponses(formId)
        .then((res) => {
          setLoading(false);
          setQuestions(
            res.data.questions.map((val, i) => {
              return {
                Header: val.question,
                accessor: `col${i}`,
              };
            })
          );
          setResponses(
            res.data.responses.map((val) => {
              var resps = {};
              val.map((re, i) => {
                if (res.data.questions[i].type === 2) {
                  return (resps[`col${i}`] = res.data.questions[i].options[re]);
                }
                return (resps[`col${i}`] = re);
              });
              return resps;
            })
          );
        })
        .catch((err) => {
          setLoading(false);
          alert(err.response.data.error);
        });
    }
  }, [formId]);
  return (
    <>
      {loading && <Loading />}
      {questions && responses && (
        <div className="m-20">
          <ResponseTable questions={questions} responses={responses} />
          <button>Download</button>
        </div>
      )}
    </>
  );
}
