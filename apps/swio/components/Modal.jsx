import React, { Component } from "react";
import { createPortal } from "react-dom";
import Listener from "../listener.js";
import classnames from "classnames";
import { rememberFocusForActiveElement } from "../focusManager.js";
import "./Modal.css";

class Modal extends Component {
  constructor() {
    super();
    this.node = React.createRef();
  }
  componentWillMount() {
    this.restoreFocus = rememberFocusForActiveElement();
  }

  componentDidMount() {
    this.listener = new Listener();
    this.listener.simple_combo("esc", this.handleCloseClick);
    this.setInitialFocus();
  }

  componentWillUnmount() {
    this.listener.destroy();
    this.restoreFocus && this.restoreFocus();
  }

  setInitialFocus() {
    const node = this.node.current;
    const input = node.querySelector('input:not([type="hidden"])');
    if (input) {
      input.focus();
    } else {
      node.querySelector(".close-button").focus();
    }
  }

  handleCloseClick = () => {
    this.props.onClose();
  };

  handleBackgroundClick = e => {
    if (e.target === this.node.current) {
      this.props.onClose();
    }
  };

  render() {
    const { children, className } = this.props;
    const classes = classnames("modal", className);

    return createPortal(
      <div
        ref={this.node}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        className={classes}
        onClick={this.handleBackgroundClick}
      >
        <button
          className="close-button"
          aria-label="close this dialog"
          onClick={this.handleCloseClick}
        >
          &times;
        </button>
        <div className="modal-panel">{children}</div>
      </div>,
      document.body.querySelector(".modals")
    );
  }
}

export default Modal;
