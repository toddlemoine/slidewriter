import debounce from "lodash.debounce";
import React, { Component } from "react";
import Helmet from "react-helmet";
import "./Presentation.css";
import Slide from "./Slide.jsx";

const RESIZE_DEBOUNCE_RATE = 300;
const DISPLAY_DELAY = 250;
const FONT_SCALE_FACTOR = 14;
const ASPECT_RATIO_HD = 16 / 9;

class Presentation extends Component {
  constructor() {
    super();
    this.state = { maxWidth: null };
    this.node = React.createRef();
  }

  componentDidMount() {
    // The timeout gives the container time to render with the
    // constraining the dimensions that we can then measure
    // to determine the Presentation's width/height.
    setTimeout(() => {
      window.addEventListener("resize", this.resize);
      this.resize();
    }, DISPLAY_DELAY);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = debounce(() => {
    if (!this.node.current || this.resizing) {
      return;
    }

    this.resizing = true;

    this.setState({ maxWidth: null }, () => {
      const {
        width: parentWidth,
        height: parentHeight
      } = this.props.getContainerDimensions();

      this.setState({
        maxWidth: parentWidth,
        maxHeight: parentHeight
      });
      this.resizing = false;
    });
  }, RESIZE_DEBOUNCE_RATE);

  aspectHeight(width) {
    return width / ASPECT_RATIO_HD;
  }
  styles = () => {
    // We know our max width because we can measure the container element.
    // 1. Based on that, determine the corresponding height,
    // 2. Is that height greater than the max height?
    //    - Yes? Remeasure, using maxHeight to constrain
    //    - No? Use that width and height combo.

    if (this.state.maxWidth === null) return { display: "none" };

    const computedHeight = this.aspectHeight(this.state.maxWidth);
    const height =
      computedHeight > this.state.maxHeight
        ? this.state.maxHeight
        : computedHeight;
    const width = height * ASPECT_RATIO_HD;

    return {
      display: "block",
      width,
      height,
      fontSize: height / this.props.fontScaleFactor
    };
  };

  render() {
    const {
      currentSlideIndex,
      currentSlideHtml,
      footerProps,
      renderFooter,
      theme,
      isDarkTheme,
      chartSettings
    } = this.props;

    const classes = ["presentation", `theme-${theme}`].join(" ");
    const computedStyles = this.styles();
    const slideNumber = currentSlideIndex + 1;

    return (
      <section
        id="presentation"
        aria-label={`Presentation preview, showing slide ${slideNumber}`}
        tabIndex={0}
        ref={this.node}
        style={computedStyles}
        className={classes}
      >
        <Helmet>
          {theme && (
            <style data-custom-styles type="text/css">{`
								@import '/themes/${theme}.css';
							`}</style>
          )}
        </Helmet>
        <Slide
          current={currentSlideIndex}
          html={currentSlideHtml}
          chartSettings={chartSettings}
          isDarkTheme={isDarkTheme}
        />
        {renderFooter && renderFooter(footerProps)}
      </section>
    );
  }
}

Presentation.defaultProps = {
  getContainerDimensions: () => ({ width: 0, height: 0 }),
  renderFooter: () => null,
  theme: "",
  isDarkTheme: false,
  fontScaleFactor: FONT_SCALE_FACTOR,
  currentSlideIndex: 0,
  currentSlideHtml: ""
};

export default Presentation;
