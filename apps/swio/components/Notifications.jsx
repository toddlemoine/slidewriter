import React, { Component } from "react";
import ReactDOM from "react-dom";
import { inject, observer } from "mobx-react";
import Notification from "./Notification";
import "./Notifications.css";

function getProps({ hub }) {
  return {
    notifications: hub.notifications
  };
}

@inject(getProps)
@observer
class Notifications extends Component {
  render() {
    const { notifications } = this.props;

    if (notifications && notifications.length) {
      return ReactDOM.createPortal(
        <section className="notifications">
          {notifications.map((props, index) => (
            <Notification key={index} {...props} />
          ))}
        </section>,
        document.body
      );
    }

    return null;
  }
}

export default Notifications;
