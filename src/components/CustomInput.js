import React from "react";

const CustomInput = ({
  type,
  label,
  name,
  value,
  i_id,
  i_class,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={i_id}>{label}</label>
      <p className="error">{error}</p>
    </div>
  );
};

export default CustomInput;
