import React from "react";
import center from "../../shared/assets/align-center.svg";
import left from "../../shared/assets/align-left.svg";
import right from "../../shared/assets/align-right.svg";
import "./AlignmentButton.css";

const iconMap = { left, center, right };

export default function AlignmentButton({
  id,
  value = "left",
  selected,
  disabled,
  onClick
}) {
  const classes = ["alignment-button"].join(" ");
  const handler = () => !disabled && onClick(value);
  const inputId = `${id}-${value}`;
  const label = `align text ${value}`;

  return (
    <div className={classes} aria-disabled={disabled}>
      <input
        id={inputId}
        name={id}
        type="radio"
        disabled={disabled}
        value={value || ""}
        onChange={handler}
        checked={selected}
      />
      <label htmlFor={inputId} onClick={handler} aria-label={label}>
        <img aria-hidden="true" className="icon" src={iconMap[value]} />
      </label>
    </div>
  );
}
