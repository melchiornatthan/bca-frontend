import React from 'react';

/**
 * InputWithLabel Component
 *
 * @param {Object} props - The component's props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - The function to handle input changes.
 * @param {string} props.id - The unique ID for the input.
 */
function InputWithLabel({ label, placeholder, value, onChange, id }) {
    return (
        <div className="form-group py-1">
            <label className='py-1'>{label}</label>
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputWithLabel;
