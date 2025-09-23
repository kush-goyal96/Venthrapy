import React from "react";

const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
}) => {
  return (
    <div className="mb-5">
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-secondary mb-2"
        >
          {label}
        </label>
      ) : null}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-heading placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition"
      />
    </div>
  );
};

export default AuthInput;
