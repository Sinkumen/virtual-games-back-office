import React from "react";

const AppInput = ({
  name,
  type = "text",
  required,
  label,
  defaultValue,
  backgroundColor = "bg-[#F3F4F6]",
  placeholder,
  value,
  onChange,
  className,
  disabled,
  step = {},
  min,
  max,
  disableAutoComplete = false,
}) => {
  const inputMode = type === "number" ? "decimal" : "text";

  if (type === "phone")
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className={`${backgroundColor} flex rounded-md`}>
          <p className="text-xs lg:text-sm px-2 border-r-[1px] border-r-gray-200 flex justify-center items-center ">
            +251
          </p>
          <input
            inputMode="tel"
            onKeyDown={(e) => e.stopPropagation()}
            disabled={disabled}
            name={name}
            defaultValue={defaultValue}
            required={!!required}
            className=" w-full bg-transparent py-3 px-4 no-spinners outline-none text-sm"
            type="number"
            placeholder={placeholder}
          />
        </div>
      </div>
    );

  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block font-medium text-sm leading-6 text-gray-900"
        >
          {label}
        </label>
      )}

      <input
        autoComplete={!disableAutoComplete}
        inputMode={inputMode}
        onKeyDown={(e) => e.stopPropagation()}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        defaultValue={defaultValue}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        type={type}
        required={!!required}
        className={`w-full  text-sm ring-1 ring-gray-300 rounded-md ${backgroundColor}  flex  py-3 px-4 ${
          type === "password" ? "font-[sans-serif]" : ""
        }`}
      />
    </div>
  );
};

export default AppInput;
