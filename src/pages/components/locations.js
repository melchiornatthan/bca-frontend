import React from 'react';

/**
 * SelectLocation Component
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.options - An array of location options.
 * @param {string} props.label - The label for the select input.
 * @param {string} props.value - The selected value.
 * @param {function} props.onChange - The function to handle selection changes.
 */
const SelectLocation = ({ options, label, value, onChange }) => {
  return (
    <div className="form-group py-1">
      <label htmlFor={label} style={{'font-family': 'Montserrat'}}>{label}</label>
      <select
        className="form-control"
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option style={{'font-family': 'Montserrat'}} key={option.id} value={option.location}>
            {option.location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLocation;
