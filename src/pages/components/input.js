import React, { useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import "typeface-karma";

/**
 * InputWithLabel Component
 *
 * @param {Object} props - The component's props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - The function to handle input changes.
 * @param {string} props.id - The unique ID for the input.
 * @param {boolean} props.isDisabled - Flag to determine whether the input is disabled.
 * @param {boolean} props.showIcon - Flag to determine whether to show the input icon.
 * @param {boolean} props.isHidden - Flag to determine whether to hide the input by using the password type.
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
      <Form.Label style={{ fontFamily: "karma", fontSize: "2vh" }}>{label}</Form.Label>
      <InputGroup>
        <FormControl
          type={inputType}
          style={{ height: "6vh" }}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
        />
      </InputGroup>
    </Form.Group>
  );
}

export default InputWithLabel;
