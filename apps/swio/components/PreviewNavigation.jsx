import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PreviewNavigation from "../../shared/components/PreviewNavigation";

function getProps({ presentationStore }) {
  return {
    back: presentationStore.back,
    next: presentationStore.next,
    nextEnabled: presentationStore.nextEnabled,
    backEnabled: presentationStore.backEnabled
  };
}

@inject(getProps)
@observer
class ConnectedPreviewNavigation extends Component {
  render() {
    return <PreviewNavigation {...this.props} />;
  }
}

export default ConnectedPreviewNavigation;
