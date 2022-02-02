import React from "react";

export default function ShortAnswer({ response, setResponse, i }) {
  const on_change = (e) => {
    var new_res = Array.from(response);
    if (e.target.value) {
      new_res[i] = e.target.value;
    } else {
      new_res[i] = null;
    }
    setResponse(new_res);
  };
  return (
    <div>
      <div className="flex">
        <input
          className="flex-1 md:m-10 text-xl border border-gray-300 p-2 text-slate-800 rounded-lg focus:drop-shadow-lg sm:w-full dark:bg-slate-600 dark:text-white dark:placeholder-slate-300"
          placeholder="Short answer..."
          value={response[i]}
          onChange={on_change}
        />
      </div>
    </div>
  );
}
