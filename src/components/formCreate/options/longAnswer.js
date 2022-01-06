import React from "react";

export default function LongAnswer() {
  return (
    <div>
      <div className="flex">
        <textarea
          className="flex-1 md:m-10 text-xl border-b border-dotted border-slate-800 p-2 text-slate-500"
          value="Long Answer"
          disabled
        />
      </div>
    </div>
  );
}
