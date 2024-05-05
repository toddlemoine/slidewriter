import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import PreviewToolbar from "../../shared/components/PreviewToolbar";

function getProps({ presentationStore, metadataStore }) {
  return {
    playbackDisabled: !metadataStore.playbackEnabled,
    onBackClick: presentationStore.back,
    backEnabled: presentationStore.backEnabled,
    onNextClick: presentationStore.next,
    nextEnabled: presentationStore.nextEnabled,
    onPlayClick: presentationStore.play,
    onPlayFromStartClick: presentationStore.playFromStart
  };
}
@inject(getProps)
@observer
class ConnectedPreviewToolbar extends Component {
  render() {
    return <PreviewToolbar {...this.props} />;
  }
}

export default ConnectedPreviewToolbar;
