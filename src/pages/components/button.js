import React from 'react';

/**
 * CustomButton Component
 *
 * @param {Object} props - The component's props.
 * @param {string} props.text - The text displayed on the button.
 * @param {string} props.color - The background color of the button (optional).
 * @param {function} props.onClick - The function to handle button clicks.
 */
const CustomButton = ({ text, color, onClick }) => {
  const buttonStyle = {
    backgroundColor: color || 'blue',
    color: 'white',
    padding: '10px 20px',
  };

  return (
    <button
      className="btn btn-primary" // Apply Bootstrap classes
      style={buttonStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
