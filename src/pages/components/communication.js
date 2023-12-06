// VsatSelect.js
import React from 'react';
import 'typeface-inter';
function VsatSelect({ value, onChange }) {
  return (
    <select 
      className="form-control" // Apply Bootstrap form-control class
      value={value}
      onChange={onChange}
    >
      <option style={{'font-family': 'inter'}} value="VSAT">VSAT</option>
      <option style={{'font-family': 'inter'}} value="M2M">M2M</option>
    </select>
  );
}

export default VsatSelect;
