import React from "react";

function Modal({ show, close, children }) {
  const handleClose = (e) => {
    if (e.target.id === "close") {
      close();
    }
  };
  return (
    <div
      className={
        !show
          ? "invisible"
          : "absolute top-0 left-0 w-screen h-screen bg-modal flex justify-center"
      }
      onClick={(e) => handleClose(e)}
      id="close"
    >
      <div className="bg-white place-self-center px-12 py-4 rounded">
        {children}
      </div>
    </div>
  );
}

export default Modal;
