import { inject, observer } from "mobx-react";
import React, { Component, Fragment } from "react";
import SlideNumber from "./SlideNumber";
import Dot from "../../shared/components/Dot";
import PreviewNavigation from "./PreviewNavigation";
import "./SlideMetadata.css";
import PlaybackDescription from "./PlaybackDescription";

function getProps({ presentationStore, metadataStore }) {
  return {
    isManualPlayback: metadataStore.isManualPlayback
  };
}
@inject(getProps)
@observer
class SlideMetadata extends Component {
  render() {
    const { isManualPlayback } = this.props;
    return (
      <section className="slide-metadata">
        <SlideNumber />
        {!isManualPlayback && (
          <Fragment>
            <Dot />
            <PlaybackDescription />
          </Fragment>
        )}
        <Dot />
        <PreviewNavigation />
      </section>
    );
  }
}

export default SlideMetadata;
