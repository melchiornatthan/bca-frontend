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
const SelectProviders = ({ options, label, value, onChange }) => {
  return (
    <div className="form-group py-1">
      <label htmlFor={label} style={{ fontFamily: "inter" }}>
        {label}
      </label>
      <select
        className="form-control mt-1"
        id={label}
        value={value}
        onChange={onChange}
        style={{
          height: "6vh",
        }}
      >
        {options.map((option) => (
          <option
            style={{ fontFamily: "inter" }}
            key={option.provider.id}
            value={option.provider.id}
          >
            {option.provider.provider}
          </option>
        ))}
      </select>
    </div>
  );
};

// Set default values for the props
SelectProviders.defaultProps = {
  options: [],
  label: "Select Provider",
  value: "",
  onChange: () => {}, // You can provide a default function or leave it as an empty function
};

export default SelectProviders;
