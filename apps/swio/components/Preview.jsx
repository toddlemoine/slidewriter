import cx from "classnames";
import React, { Component } from "react";
import PresentationStage from "../../shared/components/PresentationStage";
import Presentation from "./Presentation";
import PreviewFooter from "./PreviewFooter";
import SlideMetadata from "./SlideMetadata";
import PreviewToolbar from "./PreviewToolbar";
import { inject, observer } from "mobx-react";
import "./Preview.css";

function getProps({ presentationStore, metadataStore }) {
  return {
    showCodeBoundaries: metadataStore.draggingCodeWidthRange,
    showTextBoundaries: metadataStore.draggingTextWidthRange,
    isPlaying: presentationStore.playing,
    playbackMode: metadataStore.playbackMode,
    playbackDuration: metadataStore.presentationDuration,
    playbackUnit: metadataStore.presentationUnit
  };
}
@inject(getProps)
@observer
class Preview extends Component {
  constructor() {
    super();
    this.stage = React.createRef();
  }

  measure = () => {
    const stage = this.stage.current;
    return {
      width: stage.clientWidth,
      height: stage.clientHeight
    };
  };
  render() {
    const { isPlaying } = this.props;
    const previewClasses = cx("preview", {
      "show-text-boundaries": this.props.showTextBoundaries,
      "show-code-boundaries": this.props.showCodeBoundaries
    });
    return (
      <section className="preview-wrapper">
        <PreviewToolbar />
        <div className={previewClasses}>
          <PresentationStage ref={this.stage}>
            {!isPlaying && (
              <Presentation
                id="preview"
                resizeOnFullscreenExit={true}
                getContainerDimensions={this.measure}
              />
            )}
            <PreviewFooter>
              <SlideMetadata />
            </PreviewFooter>
          </PresentationStage>
        </div>
      </section>
    );
  }
}

export default Preview;
