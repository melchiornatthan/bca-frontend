import React from "react";
import "typeface-inter";
/**
 * SelectLocation Component
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.options - An array of location options.
 * @param {string} props.label - The label for the select input.
 * @param {string} props.value - The selected value.
 * @param {function} props.onChange - The function to handle selection changes.
 */
const SelectLocation = ({
  options,
  label,
  value,
  onChange,
  isDisabled = false,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={label} style={{ "font-family": "inter" }}>
        {label}
      </label>
      <select
        className="form-control mt-1"
        id={label}
        style={{height: "6vh"}}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      >
        {options.map((option) => (
          <option
            style={{ fontFamily: "inter" }}
            key={option.id}
            value={option.location}
          >
            {option.location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLocation;
