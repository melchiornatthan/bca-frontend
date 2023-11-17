// VsatSelect.js
import React from 'react';

function VsatSelect({ value, onChange }) {
  return (
    <select 
      className="form-control" // Apply Bootstrap form-control class
      value={value}
      onChange={onChange}
    >
      <option style={{'font-family': 'Montserrat'}} value="VSAT">VSAT</option>
      <option style={{'font-family': 'Montserrat'}} value="M2M">M2M</option>
    </select>
  );
}

export default VsatSelect;
