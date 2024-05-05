import React, { Component } from "react";
import Content from "./Content";
import PrimaryButton from "../../shared/components/PrimaryButton";
import "./Notification.css";

class Notification extends Component {
  constructor() {
    super();
    this.node = React.createRef();
  }

  componentDidMount() {
    this.timeoutId = setTimeout(this.props.onClose, this.props.dismissDelayMs);
  }

  handleClose = () => {
    clearTimeout(this.timeoutId);
    this.props.onClose();
  };

  render() {
    const { text } = this.props;
    return (
      <div ref={this.node} className="notification" onClose={this.handleClose}>
        <Content>{text}</Content>
        <footer>
          <PrimaryButton onClick={this.handleClose}>Dismiss</PrimaryButton>
        </footer>
      </div>
    );
  }
}

Notification.defaultProps = {
  dismissDelayMs: 5 * 1000
};

export default Notification;
