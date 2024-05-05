import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import dattr from "../helpers/dattr.js";
import DurationField from "./DurationField";
import "./PlaybackPanel.css";
import RadioOptionSet from "./RadioOptionSet";
import EditorTabPanel from "./EditorTabPanel";
import HelpText from "../../shared/components/HelpText";

function getProps({ metadataStore }) {
  return {
    setDuration: metadataStore.setDuration,
    setPlayback: metadataStore.setPlayback,
    isManualPlayback: metadataStore.isManualPlayback,
    isSlidePlayback: metadataStore.isSlidePlayback,
    isPresentationPlayback: metadataStore.isPresentationPlayback,
    slideDuration: metadataStore.slideDuration,
    slideUnit: metadataStore.slideUnit,
    presentationDuration: metadataStore.presentationDuration,
    presentationUnit: metadataStore.presentationUnit
  };
}

@inject(getProps)
@observer
class PlaybackPanel extends Component {
  handleDurationChange = ({ duration, unit }) => {
    this.props.setDuration(duration, unit);
  };

  handleManualModeSelect = () => {
    this.props.setPlayback("manual");
  };

  handleSlideModeSelect = () => {
    this.props.setPlayback("slide");
  };

  handlePresentationModeSelect = () => {
    this.props.setPlayback("presentation");
  };
  render() {
    const {
      isManualPlayback,
      isSlidePlayback,
      isPresentationPlayback,
      slideDuration,
      slideUnit,
      presentationDuration,
      presentationUnit
    } = this.props;
    const [
      PLAYBACK_MODE_MANUAL,
      PLAYBACK_MODE_SLIDE,
      PLAYBACK_MODE_PRESENTATION
    ] = ["manual", "slide", "presentation"].map(str => `playback-mode-${str}`);

    return (
      <EditorTabPanel id="playback" className="playback-panel">
        <HelpText>
          Choose how you want this presentation's slides to advance.
        </HelpText>
        <div className="playback-settings">
          <RadioOptionSet className="playback-settings-options">
            <label htmlFor={PLAYBACK_MODE_MANUAL}>
              <input
                {...dattr(PLAYBACK_MODE_MANUAL)}
                id={PLAYBACK_MODE_MANUAL}
                type="radio"
                checked={isManualPlayback}
                onChange={this.handleManualModeSelect}
                value="manual"
              />
              <div className="radio-option">
                <span className="option-label">Manually.</span>
                <span className="option-description">
                  You control the pace of the presentation.
                </span>
              </div>
            </label>

            <label htmlFor={PLAYBACK_MODE_SLIDE}>
              <input
                {...dattr(PLAYBACK_MODE_SLIDE)}
                id={PLAYBACK_MODE_SLIDE}
                type="radio"
                checked={isSlidePlayback}
                onChange={this.handleSlideModeSelect}
                value="slide"
              />
              <div className="radio-option">
                <span className="option-label">Timed slides.</span>
                <DurationField
                  text="Play each slide for"
                  onChange={this.handleDurationChange}
                  disabled={!isSlidePlayback}
                  name="slide"
                  duration={slideDuration}
                  unit={slideUnit}
                  hours={false}
                />
              </div>
            </label>

            <label htmlFor={PLAYBACK_MODE_PRESENTATION}>
              <input
                {...dattr(PLAYBACK_MODE_PRESENTATION)}
                id={PLAYBACK_MODE_PRESENTATION}
                type="radio"
                checked={isPresentationPlayback}
                onChange={this.handlePresentationModeSelect}
                value="presentation"
              />

              <div className="radio-option">
                <span className="option-label">Timed presentation.</span>
                <DurationField
                  text="Play each slide so presentation lasts"
                  onChange={this.handleDurationChange}
                  disabled={!isPresentationPlayback}
                  name="presentation"
                  duration={presentationDuration}
                  unit={presentationUnit}
                />
              </div>
            </label>
          </RadioOptionSet>
        </div>
      </EditorTabPanel>
    );
  }
}

export default PlaybackPanel;
