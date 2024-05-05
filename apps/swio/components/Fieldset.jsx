import React from "react";
import classnames from "classnames";
import "./Fieldset.css";

export default function Fieldset({ className = "", legend = "", children }) {
  const classes = classnames("fieldset", { "no-legend": !legend }, className);
  return (
    <fieldset className={classes}>
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
}
