// VsatSelect.js
import React from "react";
import "typeface-inter";
function VsatSelect({ value, onChange }) {
  return (
    <select
      className="form-control mt-1" // Apply Bootstrap form-control class
      value={value}
      style={{height: "6vh"}}
      onChange={onChange}
    >
      <option style={{ "font-family": "inter" }} value="VSAT">
        VSAT
      </option>
      <option style={{ "font-family": "inter" }} value="M2M">
        M2M
      </option>
    </select>
  );
}

export default VsatSelect;
