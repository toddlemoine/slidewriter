import fscreen from "fscreen";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SlideFooter from "../../../shared/components/SlideFooter";
import { rememberFocusForActiveElement } from "../../focusManager.js";
import {
  computeSlideInterval,
  computeSlideIntervalBasedOnPresentationLength
} from "../../helpers/slideInterval.js";
import { NEXT_SLIDE_KEYS, PREV_SLIDE_KEYS } from "../../keys.js";
import Listener from "../../listener.js";
import "./FullPresentation.css";
import Presentation from "../../../shared/components/Presentation";

function isManualMode(settings) {
  return settings.mode === "manual";
}

class FullPresentation extends Component {
  constructor(props) {
    super(props);
    this.restoreFocus = rememberFocusForActiveElement();
    this.state = {
      current: props.current,
      style: this.styles(props)
    };
    this.presentationRef = React.createRef();
  }

  styles(props) {
    const height = window.screen.height;
    return {
      width: "100%",
      height,
      fontSize: height / props.fontScaleFactor
    };
  }

  componentDidMount() {
    this.listener = new Listener();
    fscreen.addEventListener("fullscreenchange", this.handleFullscreenChange);
    this.play();
  }

  componentWillUnmount() {
    this.listener.destroy();
    clearInterval(this.intervalId);
    fscreen.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );
  }

  handleFullscreenChange = () => {
    if (fscreen.fullscreenElement !== null) {
      // this.presentationRef.current.resize();
      NEXT_SLIDE_KEYS.forEach(key =>
        this.listener.simple_combo(key, this.next)
      );
      PREV_SLIDE_KEYS.forEach(key =>
        this.listener.simple_combo(key, this.back)
      );
    } else {
      this.listener.unregister_many(NEXT_SLIDE_KEYS.concat(PREV_SLIDE_KEYS));
      this.restoreFocus();
      this.props.onQuit(this.state.current);
    }
  };

  setIntervalPlayback = () => {
    const settings = this.props.playbackSettings;
    let slideInterval;

    if (settings.mode === "slide") {
      slideInterval = computeSlideInterval(settings.duration, settings.unit);
    }

    if (settings.mode === "presentation") {
      slideInterval = computeSlideIntervalBasedOnPresentationLength(
        settings.duration,
        settings.unit,
        this.props.slides.length,
        this.current
      );
    }

    this.intervalId = setInterval(() => this.next(), slideInterval);
  };

  resetSlideInterval = () => {
    clearInterval(this.intervalId);
    this.setIntervalPlayback();
  };

  next = () => {
    const nextIndex = this.state.current + 1;

    if (nextIndex === this.props.slides.length) return;

    this.setState({ current: nextIndex });

    if (nextIndex === this.props.slides.length - 1) {
      clearInterval(this.intervalId);
      this.finished = true;
      return;
    }

    if (!this.finished && !isManualMode(this.props.playbackSettings)) {
      this.resetSlideInterval();
    }
  };

  back = () => {
    const prevIndex = this.state.current - 1;

    if (prevIndex === -1) {
      return;
    }

    if (!this.finished && !isManualMode(this.props.playbackSettings)) {
      this.resetSlideInterval();
    }

    this.setState({ current: prevIndex });
  };

  play = () => {
    this.fullscreen();

    if (!isManualMode(this.props.playbackSettings)) {
      this.setIntervalPlayback();
    }
  };

  playFromStart = () => {
    this.current = 0;
    this.play();
  };

  initializeDOMNode = node => {
    this.node = node;
  };

  fullscreen = () => {
    fscreen.requestFullscreen(this.node);
  };

  measure = () => {
    return {
      width: window.screen.width,
      height: window.screen.height
    };
  };

  render() {
    const {
      theme,
      isDarkTheme,
      chart,
      slides = [],
      footer,
      fontScaleFactor
    } = this.props;
    const currentSlide = slides[this.state.current];

    return ReactDOM.createPortal(
      <section ref={this.initializeDOMNode} className="full-presentation">
        <Presentation
          id="fs"
          ref={this.presentationRef}
          getContainerDimensions={this.measure}
          footerProps={footer}
          renderFooter={props => <SlideFooter {...props} />}
          theme={theme}
          isDarkTheme={isDarkTheme}
          chartSettings={chart}
          fontScaleFactor={fontScaleFactor}
          currentSlideIndex={this.state.current}
          currentSlideHtml={currentSlide}
        />
      </section>,
      document.querySelector("body")
    );
  }
}

FullPresentation.defaultProps = {
  mode: "manual"
};

export default FullPresentation;
