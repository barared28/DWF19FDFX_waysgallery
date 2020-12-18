import React from "react";

function Modal({ show, close, children, shadow = true, popup = false }) {
  const handleClose = (e) => {
    if (e.target.id === "close") {
      close();
    }
  };
  if (popup) {
    setTimeout(() => {
      close();
    }, 2000);
  }
  return (
    <div
      className={
        !show
          ? "invisible"
          : shadow
          ? "absolute top-0 left-0 w-screen h-screen max-h-screen bg-modal flex justify-center"
          : "absolute top-0 left-0 w-screen h-screen max-h-screen flex justify-center"
      }
      onClick={(e) => handleClose(e)}
      id="close"
    >
      <div
        className={`bg-white place-self-center px-12 py-4 rounded ${
          !shadow && "border-2 border-gray-500"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
