import React from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import "typeface-karma";

/**
 * InputWithLabel Component renders an input field with a label and optional eye icon for password visibility.
 * @param {Object} props - The component's props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - The function to handle input changes.
 * @param {string} props.id - The unique ID for the input.
 * @param {boolean} props.isDisabled - Flag to determine whether the input is disabled.
 * @param {boolean} props.isHidden - Flag to determine whether to hide the input by using the password type.
 * @returns {JSX.Element} - An input field component with label and optional eye icon.
 */
function InputWithLabel({
  label,
  placeholder,
  value,
  onChange,
  id,
  isDisabled = false,
  isHidden = false,
}) {
  const inputType = isHidden ? "password" : "text";

  return (
    <Form.Group className="my-1">
      {/* Render the label for the input field */}
      <Form.Label style={{ fontFamily: "karma", fontSize: "2vh" }}>
        {label}
      </Form.Label>
      <InputGroup>
        {/* Render the input field */}
        <FormControl
          type={inputType} // Set the input type based on the isHidden prop
          style={{ height: "6vh" }} // Customize the height of the input field
          placeholder={placeholder} // Set the placeholder text for the input field
          id={id} // Set the unique ID for the input field
          value={value} // Set the current value of the input field
          onChange={onChange} // Call the provided onChange function when the input value changes
          disabled={isDisabled} // Set the input field as disabled if isDisabled prop is true
        />
      </InputGroup>
    </Form.Group>
  );
}

export default InputWithLabel; // Export the InputWithLabel component for use in other files
