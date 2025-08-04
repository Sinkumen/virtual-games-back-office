import React from "react";

const AppText = ({ children, className }) => {
  return <p className={`dark:text-dark-text ${className}`}>{children}</p>;
};

export default AppText;
