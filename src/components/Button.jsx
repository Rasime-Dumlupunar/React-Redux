import React from "react";

const Button = ({ onClick, btnText }) => {
  return (
    <button
      className="w-full h-10 bg-red-500 text-white flex items-center justify-center mt-2 rounded-md border "
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
