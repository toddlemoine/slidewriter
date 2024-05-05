import React from "react";
import classnames from "classnames";
import "./LoginFlowPanel.css";
import Logo from "./Logo";

export default function LoginFlowPanel({ className, children, ...props }) {
  const classes = classnames("login-flow-panel", className);
  return (
    <section className={classes} {...props}>
      <Logo />
      {children}
    </section>
  );
}
