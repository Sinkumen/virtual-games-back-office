import React, { useState, useCallback, useMemo } from "react";
import ToastContext from "./ToastContext";
import AppToast from "@/components/AppToast";
import { createPortal } from "react-dom";

const ToastContainer = React.memo(
  ({ type, show, setShow, label, description }) => {
    return createPortal(
      <AppToast
        type={type}
        show={show}
        setShow={setShow}
        label={label}
        description={description}
      />,
      document.body // Render toast at the end of the document
    );
  }
);

const ToastContextProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastLabel, setToastLabel] = useState("");
  const [toastDescription, setToastDescription] = useState("");

  const showMessage = useCallback((message, options) => {
    const type = options?.type ?? "success";
    setToastLabel(type === "success" ? "Success!" : "Something went wrong!");
    setToastDescription(message);
    setIsSuccess(type === "success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  const contextValue = useMemo(() => ({ showMessage }), [showMessage]);

  return (
    <>
      <ToastContext.Provider value={contextValue}>
        {children}
      </ToastContext.Provider>
      <ToastContainer
        type={isSuccess ? "success" : "error"}
        show={showToast}
        setShow={setShowToast}
        label={toastLabel}
        description={toastDescription}
      />
    </>
  );
};
ToastContainer.displayName = "ToastContainer";

export default ToastContextProvider;
