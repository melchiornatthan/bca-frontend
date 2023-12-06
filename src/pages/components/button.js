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
    backgroundColor: color || '#0060AF', // Set the background color to #0060AF
    color: 'white',
    padding: '1vh 6vh'
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
