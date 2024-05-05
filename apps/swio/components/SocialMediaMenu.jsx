import React from "react";
import icons from "../icons";

export default function SocialMediaMenu({ id, name, onChange, value }) {
  return (
    <select
      id={id}
      className="social-media-menu"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="none">None</option>
      {Object.entries(icons).map(([key, val]) => (
        <option key={key} value={key}>
          {val}
        </option>
      ))}
    </select>
  );
}
