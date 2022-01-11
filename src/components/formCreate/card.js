import React from "react";
import { BsArrowsMove } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

import Dropdown from "./options/dropdown";
import LongAnswer from "./options/longAnswer";
import ShortAnswer from "./options/shortAnswer";

export default function Card(props) {
  const select_change = (e) => {
    props.dispatch({
      type: "changeType",
      i: props.i,
      newType: parseInt(e.target.value),
    });
  };
  const question_change = (e) => {
    props.dispatch({
      type: "changeQuetion",
      i: props.i,
      newQuetion: e.target.value,
    });
  };
  const optionSwitch = (option) => {
    switch (option) {
      case 0:
        return <ShortAnswer />;
      case 1:
        return <LongAnswer />;
      case 2:
        return (
          <Dropdown
            dispatch={props.dispatch}
            i={props.i}
            options={props.options}
            state={props.state}
          />
        );
      case 3:
        return (
          <Dropdown
            dispatch={props.dispatch}
            i={props.i}
            options={props.options}
            state={props.state}
          />
        );
      default:
        return "";
    }
  };
  return (
    <div className="bg-white border-2 border-slate-700 p-5 m-10 mt-0 rounded-md drop-shadow-lg py-10 dark:bg-slate-700">
      <div className="">
        <div
          className=" text-2xl bg-white p-2.5 rounded-full border-2 border-slate-700 z-10 inline-block absolute -top-5 -left-5 drop-shadow-xl dark:bg-slate-700 dark:text-white"
          {...props.provided.dragHandleProps}
        >
          <BsArrowsMove />
        </div>
      </div>
      <div className="md:mx-10 my-5">
        <input
          className="md:flex-1 text-slate-800 outline-0 border-b border-dotted border-slate-500 text-4xl placeholder-slate-600 px-2 mx-2 w-full md:w-fit dark:bg-slate-700 dark:text-white dark:placeholder-slate-300 dark:border-white"
          placeholder="Question"
          onChange={question_change}
          value={props.question ? props.question : ""}
        />
        <select
          className="flex-1 form-select appearance-none drop-shadow-sm px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6 md:mt-0 dark:bg-slate-700 dark:text-white"
          onChange={select_change}
        >
          {props.type_options.map((val, index) => {
            return (
              <option key={index} value={index} selected={props.type === index}>
                {val}
              </option>
            );
          })}
        </select>
      </div>
      {optionSwitch(props.type)}
      <div className="flex flex-col items-end mt-7">
        <button
          onClick={() => {
            props.dispatch({ type: "removeCard", i: props.i });
          }}
        >
          <FaTrash className="text-2xl drop-shadow-lg dark:text-white" />
        </button>
      </div>
    </div>
  );
}
