import React, { Component } from "react";
import "./CloseButton.css";

function CloseButton({ setRef, onClick }) {
  return (
    <button
      className="close-button"
      ref={setRef}
      onClick={onClick}
      aria-label="close"
    >
      &times;
    </button>
  );
}

export default CloseButton;
