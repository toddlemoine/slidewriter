import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PlaybackDescription from "../../shared/components/PlaybackDescription";

function getProps({ metadataStore }) {
  return {
    // Returns { mode, duration, unit }
    ...metadataStore.playbackSettings
  };
}

@inject(getProps)
@observer
class ConnectedPlaybackDescription extends Component {
  render() {
    return <PlaybackDescription {...this.props} />;
  }
}

export default ConnectedPlaybackDescription;
