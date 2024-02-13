import React from "react";
import { Form } from "react-bootstrap";
import "typeface-karma";

function VsatSelect({ value, onChange }) {
  return (
    <Form.Control
      as="select"
      className="mt-1"
      value={value}
      style={{ height: "6vh" }}
      onChange={onChange}
    >
      <option style={{ fontFamily: "karma" }} value="VSAT">
        VSAT
      </option>
      <option style={{ fontFamily: "karma" }} value="M2M">
        M2M
      </option>
    </Form.Control>
  );
}

export default VsatSelect;
