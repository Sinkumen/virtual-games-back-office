import { Datepicker } from "flowbite-react";
import moment from "moment";
import React, { useState } from "react";

const AppDatePicker = ({
  value,
  label,
  name,
  onChange,
  placeholder = "Select a date",
}) => {
  return (
    <div className="flex flex-col w-full flex-1 ">
      <Datepicker
        value={value}
        tabIndex={-1}
        name={name}
        autoFocus={false}
        style={{ height: "45px", borderRadius: 5 }}
        onChange={onChange}
        theme={{
          popup: {
            footer: {
              button: {
                today: "bg-primary text-white",
              },
            },
          },
          views: {
            days: {
              items: {
                item: {
                  selected: "bg-primary text-white",
                },
              },
            },
            months: {
              items: {
                item: {
                  selected: "bg-primary text-white",
                },
              },
            },
            years: {
              items: {
                item: {
                  selected: "bg-primary text-white",
                },
              },
            },
            decades: {
              items: {
                item: {
                  selected: "bg-primary text-white",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default AppDatePicker;
