import classnames from "classnames";
import React, { Component } from "react";
import Listener from "../listener";
import "./SidePanel.css";

function saveFocus() {
  const activeElement = document.activeElement;
  return () => activeElement.focus();
}

class SidePanel extends Component {
  constructor() {
    super();
    this.node = React.createRef();
  }
  componentDidMount() {
    if (this.props.restoreFocus) {
      this.restoreFocus = saveFocus();
    }

    if (this.props.initialFocus) {
      this.props.initialFocus(this.node.current);
    } else {
      this.closeButtonNode.focus();
    }

    this.listener = new Listener();
    this.listener.simple_combo("esc", this.close);
  }
  componentWillUnmount() {
    this.listener.destroy();
    if (this.props.restoreFocus) {
      this.restoreFocus();
    }
  }
  buttonRef = node => {
    this.closeButtonNode = node;
  };
  close = () => {
    this.props.onClose();
  };
  render() {
    const {
      children,
      className,
      title,
      iconSvg,
      alignment = "right"
    } = this.props;
    const classes = classnames(
      "side-panel",
      { right: alignment === "right", left: alignment === "left" },
      className
    );
    return (
      <aside ref={this.node} className={classes}>
        <header>
          {iconSvg && (
            <img className="title-icon" src={iconSvg} aria-hidden="true" />
          )}
          <h1 className="title">{title}</h1>
          <button
            ref={this.buttonRef}
            className="close-button"
            onClick={this.close}
          >
            &times;
          </button>
        </header>
        <section className="content">{children}</section>
      </aside>
    );
  }
}

SidePanel.defaultProps = {
  restoreFocus: true
};

export default SidePanel;
