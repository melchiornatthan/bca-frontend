import React from "react";
import "typeface-inter";

/**
 * SelectProviders Component renders a select input for selecting providers.
 * @param {Object} props - The component's props.
 * @param {Array} props.options - An array of location options.
 * @param {string} props.label - The label for the select input.
 * @param {string} props.value - The selected value.
 * @param {function} props.onChange - The function to handle selection changes.
 * @returns {JSX.Element} - SelectProviders component.
 */
const SelectProviders = ({ options, label, value, onChange }) => {
  return (
    <div className="form-group py-1">
      {/* Label for the select input */}
      <label htmlFor={label} style={{ fontFamily: "inter" }}>
        {label}
      </label>
      {/* Select input */}
      <select
        className="form-control mt-1"
        id={label}
        value={value}
        onChange={onChange}
        style={{
          height: "6vh",
        }}
      >
        {/* Render options dynamically */}
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

export default SelectProviders; // Export the SelectProviders component for use in other files
