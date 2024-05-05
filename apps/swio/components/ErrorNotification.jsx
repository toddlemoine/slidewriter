import React, { Component } from "react";
import "./ErrorNotification.css";
import PrimaryButton from "../../shared/components/PrimaryButton";
import Button from "../../shared/components/Button";
import { rememberFocusForActiveElement } from "../focusManager";

class ErrorNotification extends Component {
  constructor() {
    super();
    this.node = React.createRef();
    this.restoreFocus = rememberFocusForActiveElement();
  }

  componentDidMount() {
    this.node.current.querySelector("button").focus();
  }

  handleKeyDown = e => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  close = () => {
    this.props.onClose();
    this.restoreFocus();
  };

  render() {
    const { text, onRetry } = this.props;

    const buttons = [];

    if (onRetry) {
      buttons.push(
        <PrimaryButton key="retry" onClick={onRetry}>
          Retry
        </PrimaryButton>
      );
      buttons.push(
        <Button key="close-secondary" onClick={this.close}>
          Close and return to app
        </Button>
      );
    } else {
      buttons.push(
        <PrimaryButton key="close-primary" onClick={this.close}>
          Close and return to app
        </PrimaryButton>
      );
    }

    return (
      <div
        ref={this.node}
        className="error-notification"
        onKeyDown={this.handleKeyDown}
      >
        <section className="error-notification-content">{text}</section>
        <div className="error-notification-actions">{buttons}</div>
      </div>
    );
  }
}

export default ErrorNotification;
