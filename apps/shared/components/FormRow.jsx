import React from "react";

export default function FormRow({ children, ...props }) {
  return (
    <div className="form-row" {...props}>
      {children}
    </div>
  );
}
