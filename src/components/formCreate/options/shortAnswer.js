import React from "react";

export default function ShortAnswer() {
  return (
    <div>
      <div className="flex">
        <input
          className="flex-1 md:m-10 text-xl border-b border-dotted border-slate-800 p-2 text-slate-500"
          value="Short Answer"
          disabled
        />
      </div>
    </div>
  );
}
