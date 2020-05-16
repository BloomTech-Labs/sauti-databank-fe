import React from "react";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  handleChange
}) => {
  return (
    <input type={type} name={name} checked={checked} onChange={handleChange} />
  );
};
export default Checkbox;
