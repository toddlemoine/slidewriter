import React from "react";
import logoSvg from "../assets/logo-black.svg";
import "./SiteName.css";

export default function SiteName() {
  return (
    <a href="/">
      <img className="site-name" src={logoSvg} aria-label="Slidewriter.io" />
    </a>
  );
}
