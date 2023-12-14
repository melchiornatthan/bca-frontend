import React, { useState } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

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
 * @param {boolean} props.isDisabled - Flag to determine whether the input is disabled.
 * @param {boolean} props.showIcon - Flag to determine whether to show the input icon.
 */
function InputWithLabel({
  label,
  placeholder,
  value,
  onChange,
  id,
  hideInput = false,
  isDisabled = false,
  showIcon = false,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputType = hideInput ? (passwordVisible ? "text" : "password") : "text";

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <input
          type={inputType}
          className="form-control"
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
        />
        {showIcon && hideInput && (
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary mx-1"
              type="button"
              onClick={togglePasswordVisibility}
              style={{ borderColor: "#ffffff" }}
            >
              {passwordVisible ? <RiEyeLine /> : <RiEyeCloseLine />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputWithLabel;
