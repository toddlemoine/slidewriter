import React, { Component } from "react";
import ReactDOM from "react-dom";
import { inject, observer } from "mobx-react";
import ErrorNotification from "./ErrorNotification";
import "./ErrorNotifications.css";

function getProps({ hub }) {
  return {
    error: hub.error,
    clearError: hub.clearError
  };
}

@inject(getProps)
@observer
class ErrorNotifications extends Component {
  render() {
    const { error } = this.props;

    if (error) {
      return ReactDOM.createPortal(
        <section className="error-notifications">
          <ErrorNotification {...error} onClose={this.props.clearError} />
        </section>,
        document.body
      );
    }

    return null;
  }
}

export default ErrorNotifications;
