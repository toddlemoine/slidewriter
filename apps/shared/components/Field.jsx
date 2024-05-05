import classnames from "classnames";
import React from "react";
import "./Field.css";

export default function Field({ htmlFor, label, children, className }) {
  const classes = classnames("field", className);
  return (
    <div className={classes}>
      <label className="field-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
