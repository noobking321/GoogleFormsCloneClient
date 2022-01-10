import React from "react";
import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-black opacity-75 z-50">
      <span
        className="text-white top-1/2 my-0 mx-auto block relative w-0 h-0"
        style={{ top: "50%" }}
      >
        <ImSpinner2 className="animate-spin text-5xl" />
      </span>
    </div>
  );
}
