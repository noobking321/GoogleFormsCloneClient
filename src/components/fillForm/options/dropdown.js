import React from "react";

export default function Dropdown({ response, setResponse, i, options }) {
  const on_change = (e) => {
    var new_res = Array.from(response);
    if (e.target.value) {
      new_res[i] = parseInt(e.target.value);
    } else {
      new_res[i] = null;
    }
    setResponse(new_res);
  };
  return (
    <div>
      <div className="flex py-8">
        <select
          className="flex-1 md:m-10 form-select appearance-none drop-shadow-sm px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6 md:mt-0 dark:bg-slate-600 dark:text-white dark:placeholder-slate-300"
          defaultChecked={response[i]}
          onChange={on_change}
        >
          <option key={i} value={""}>
            Choose...
          </option>
          {options.map((val, i) => {
            return (
              <option key={i + 1} value={i}>
                {val}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
