import React from "react";
import logoBlack from "../assets/swio-logo-black.svg";
import logoWhite from "../assets/swio-logo-white.svg";

export default function Logo({ color }) {
  const logo = color === "white" ? logoWhite : logoBlack;
  return <img className="logo" src={logo} aria-hidden={true} />;
}
