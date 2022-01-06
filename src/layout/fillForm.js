import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getForm } from "../axios";

export default function FillForm(props) {
  var { formId } = useParams();
  const [data, setData] = useState();
  if (formId && !data) {
    getForm(formId)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        return err;
      });
  }
  console.log(data);
  return (
    <div>
      {data && (
        <>
          Form Name: {data.name}
          <ul>
            {data.questions.map((val, i) => {
              return (
                <li key={i}>
                  Quetion: {val.question} Type: {val.type}{" "}
                  {val.options.length && (
                    <>
                      Options:
                      {val.options.map((val) => {
                        return val;
                      })}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
