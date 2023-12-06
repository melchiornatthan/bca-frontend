import React from "react";

/**
 * InputWithLabel Component
 *
 * @param {Object} props - The component's props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - The function to handle input changes.
 * @param {string} props.id - The unique ID for the input.
 * @param {boolean} props.hideInput - Flag to determine whether to hide the input.
 */
function InputWithLabel({
  label,
  placeholder,
  value,
  onChange,
  id,
  hideInput = false,
  isDisabled = false,
}) {
  const inputType = hideInput ? "password" : "text";

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={inputType}
        className="form-control"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
}

export default InputWithLabel;
