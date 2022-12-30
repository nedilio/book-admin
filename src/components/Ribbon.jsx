import React from "react";

const Ribbon = ({ text }) => {
  return (
    <div className="absolute top-0 right-0 bg-green-300 p-3 rounded-xl text-green-800">
      {text}
    </div>
  );
};

export default Ribbon;
