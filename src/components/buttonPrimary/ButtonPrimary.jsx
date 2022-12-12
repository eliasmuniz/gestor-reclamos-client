import React from "react";

const ButtonPrimary = ({ onClick, children, styles }) => {
  return (
    <button
      onClick={() => onClick()}
      type="button"
      className={`${
        styles ? styles : "bg-blue-600 hover:bg-blue-800 "
      } flex text-white items-center  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none `}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
