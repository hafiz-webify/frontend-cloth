import React from "react";
import { Form } from "react-bootstrap";

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <Form.Control
      type="text"
      className="mb-3"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
