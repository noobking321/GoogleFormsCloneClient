import React from "react";

import Dropdown from "./options/dropdown";
import LongAnswer from "./options/longAnswer";
import ShortAnswer from "./options/shortAnswer";

export default function Card(props) {
  const optionSwitch = (option) => {
    switch (option) {
      case 0:
        return (
          <ShortAnswer
            i={props.i}
            response={props.response}
            setResponse={props.setResponse}
          />
        );
      case 1:
        return (
          <LongAnswer
            i={props.i}
            response={props.response}
            setResponse={props.setResponse}
          />
        );
      case 2:
        return (
          <Dropdown
            i={props.i}
            response={props.response}
            setResponse={props.setResponse}
            options={props.options}
          />
        );
      default:
        return "";
    }
  };
  return (
    <div className="bg-white border-2 border-slate-700 p-5 m-5 rounded-md drop-shadow-lg py-10 md:w-2/5">
      <div className="md:mx-12 my-5 text-slate-800 outline-0 border-b border-slate-200 text-4xl placeholder-slate-600">
        {props.question}
      </div>
      <div className="">{optionSwitch(props.type)}</div>
    </div>
  );
}
