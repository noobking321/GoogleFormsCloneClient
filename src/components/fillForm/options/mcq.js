import React from "react";

export default function Mcq({ response, setResponse, i, options }) {
  const on_change = (e) => {
    var new_res = Array.from(response);
    if (e.target.value && new_res[i] !== parseInt(e.target.value)) {
      new_res[i] = parseInt(e.target.value);
    } else {
      new_res[i] = null;
    }
    setResponse(new_res);
  };
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col md:m-10 form-select appearance-none drop-shadow-sm px-3 py-1.5">
          {options.map((val, j) => {
            return (
              <div class="form-check my-2">
                <input
                  type="radio"
                  name={`${options}_${i}`}
                  key={j}
                  value={j}
                  onChange={on_change}
                  onClick={on_change}
                  checked={response[i] === j}
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white dark:checked:bg-blue-600 dark:checked:border-blue-600 checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  id={`${options}_${i}_${j}`}
                />
                <label
                  class="form-check-label inline-block text-gray-800 dark:text-white"
                  htmlFor={`${options}_${i}_${j}`}
                >
                  {val}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
