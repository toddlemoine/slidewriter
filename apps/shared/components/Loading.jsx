import React, { Component } from "react";
import Spinner from "./Spinner";
import "./Loading.css";

function LoadingMessage() {
  return <div className="loading-message">Loading</div>;
}

class Loading extends Component {
  state = {
    showSpinner: false
  };

  constructor(props) {
    super(props);
    this.timeoutId = setTimeout(this.showSpinner, props.delayMs);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  showSpinner = () => {
    if (!this.props.loaded) {
      this.setState({ showSpinner: true });
    }
  };

  render() {
    return this.state.showSpinner ? (
      <div className="loading">
        <div className="content">
          <Spinner />
          <LoadingMessage />
        </div>
      </div>
    ) : null;
  }
}

Loading.defaultProps = {
  delayMs: 100
};

export default Loading;
