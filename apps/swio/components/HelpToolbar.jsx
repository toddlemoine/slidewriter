import React from "react";
import HelpLink from "./HelpLink";
import KeyboardHelpButton from "./KeyboardHelpButton";
import "./HelpToolbar.css";

export default function HelpToolbar() {
  return (
    <div className="help-toolbar">
      <KeyboardHelpButton />
      <HelpLink />
    </div>
  );
}
