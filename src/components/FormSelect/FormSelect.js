import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";

const FormSelect = ({
  name,
  label,
  options = [],
  defaultValue,
  placeholder = "Select an option",
  disabled = false,
  onChange,
  className = "",
}) => {
  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        <select
          name={name}
          className="bg-[#F3F4F6] appearance-none ring-1 ring-gray-300 rounded-md py-3 px-2 w-full text-sm"
          disabled={disabled}
          onChange={handleChange}
          defaultValue={defaultValue}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon className=" w-4 h-4" />
        </span>
      </div>
    </div>
  );
};

export default FormSelect;
