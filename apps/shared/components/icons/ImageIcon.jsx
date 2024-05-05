import React from "react";

export default function ImageIcon({ src, ...otherProps }) {
  return (
    <img className="image-icon" src={src} aria-hidden={true} {...otherProps} />
  );
}
