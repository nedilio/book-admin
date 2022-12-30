import { Orbit } from "@uiball/loaders";
import React from "react";

const Loader = () => {
  return (
    <div className="absolute w-full h-full bg-red-500 top-0 left-0 flex justify-center items-center">
      <Orbit size={35} color="#231F20" />
    </div>
  );
};

export default Loader;
