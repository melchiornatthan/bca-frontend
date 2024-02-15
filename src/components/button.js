import React from "react";

const CustomButton = ({ text, color, onClick }) => {
  const buttonStyle = {
    backgroundColor: color || "#0060AF", // Set the background color to #0060AF
    color: "white",
    padding: "1vh 6vh",
  };

  return (
    <button
      className="btn my-2 btn-primary" // Apply Bootstrap classes
      style={buttonStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
