import React from "react";

/**
 * CustomButton component renders a button with customizable text, color, and onClick handler.
 * @param {string} text - The text to be displayed on the button.
 * @param {string} color - The background color of the button. Defaults to '#0060AF' if not provided.
 * @param {function} onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} - A button component with specified properties.
 */
const CustomButton = ({ text, color, onClick }) => {
  // Inline style object to customize the appearance of the button
  const buttonStyle = {
    backgroundColor: color || "#0060AF", // Default color is blue if not provided
    color: "white", // Text color is white
    padding: "1vh 6vh", // Padding for the button
  };

  return (
    <button
      className="btn my-2 btn-primary" // Bootstrap classes for styling
      style={buttonStyle} // Apply custom styles
      onClick={onClick} // Call the provided onClick function when button is clicked
    >
      {text} {/* Display the provided text on the button */}
    </button>
  );
};

export default CustomButton; // Export the CustomButton component for use in other files
