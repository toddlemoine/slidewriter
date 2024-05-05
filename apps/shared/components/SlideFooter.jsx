import classnames from "classnames";
import React from "react";
import "./SlideFooter.css";
import WatermarkIcon from "./WatermarkIcon.jsx";
import alignmentToFlex from "../helpers/alignmentToFlex";

function styles({ alignment, opacity, backgroundColor = "transparent" }) {
  return {
    opacity,
    backgroundColor,
    justifyContent: alignmentToFlex(alignment)
  };
}

function SlideFooter({
  icon,
  text,
  brightness,
  opacity,
  backgroundColor,
  alignment
}) {
  const classes = classnames("slide-footer", brightness);
  return (
    <div
      className={classes}
      style={styles({ opacity, backgroundColor, alignment })}
    >
      <div className="slide-footer-content">
        {icon && <WatermarkIcon icon={icon} />}
        {text}
      </div>
    </div>
  );
}

export default SlideFooter;
