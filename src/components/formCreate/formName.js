import React from "react";

import config from "../../config";

export default function FormName(props) {
  const formName = (e) => {
    props.dispatch({
      type: "changeFormName",
      i: props.i,
      newFormName: e.target.value,
    });
  };
  return (
    <div className="bg-white border-2 border-slate-700 p-5 my-5 rounded-md drop-shadow-lg">
      <div className="flex mx-28 my-10">
        <input
          className="flex-1 text-slate-800 outline-0 border-b border-dotted border-slate-500 text-4xl placeholder-slate-800 px-2 mx-2"
          onChange={formName}
          value={
            props.formName !== config.untitledFormName ? props.formName : ""
          }
          placeholder={config.untitledFormName}
        />
      </div>
    </div>
  );
}
