import React from "react";
import { getFormattedValues } from "../helpers/getFormattedValues";

const Preview = ({ setting, settingIdentifier }) => {
  const formattedValues = getFormattedValues(setting, settingIdentifier);

  return (
    <div className="grid grid-cols-2 gap-2 pt-2 rounded-lg">
      {formattedValues.map((item, index) => {
        const isLastItem = index === formattedValues.length - 1;
        const isOddLength = formattedValues.length % 2 !== 0;
        return (
          <div
            key={index}
            className={`bg-slate-100 p-2 rounded-lg ${
              isOddLength && isLastItem ? "col-span-2" : ""
            }`}
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <p className="font-semibold">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Preview;
