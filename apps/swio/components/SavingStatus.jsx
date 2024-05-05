import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./SavingStatus.css";

function getProps({ hub }) {
  return {
    isSaving: hub.saving
  };
}

@inject(getProps)
@observer
class SavingStatus extends Component {
  render() {
    const text = this.props.isSaving ? "…" : "Saved";
    return <span className="saving-status">{text}</span>;
  }
}

export default SavingStatus;
