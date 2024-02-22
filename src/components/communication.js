import React from "react";
import { Form } from "react-bootstrap";
import "typeface-karma";

/**
 * VsatSelect component renders a dropdown select input with options for VSAT and M2M.
 * @param {string} value - The current selected value.
 * @param {function} onChange - The function to be called when the select value changes.
 * @returns {JSX.Element} - A dropdown select component with specified properties.
 */
function VsatSelect({ value, onChange }) {
  return (
    <Form.Control
      as="select" // Render as a select input
      className="mt-1" // Add margin top for spacing
      value={value} // Set the value of the select input
      style={{ height: "6vh" }} // Customize the height of the select input
      onChange={onChange} // Call the provided onChange function when the value changes
    >
      {/* Option for VSAT */}
      <option style={{ fontFamily: "karma" }} value="VSAT">
        VSAT
      </option>
      {/* Option for M2M */}
      <option style={{ fontFamily: "karma" }} value="M2M">
        M2M
      </option>
    </Form.Control>
  );
}

export default VsatSelect; // Export the VsatSelect component for use in other files
