import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Presentation from "../../shared/components/Presentation";
import "./Presentation.css";
import SlideFooter from "./SlideFooter";

function getProps({ metadataStore, presentationStore }) {
  return {
    onResize: metadataStore.resize,
    theme: metadataStore.theme,
    isDarkTheme: metadataStore.isDarkTheme,
    fontScaleFactor: metadataStore.fontScaleFactor,
    currentSlideIndex: presentationStore.current,
    currentSlideHtml: presentationStore.currentSlide,
    footerProps: metadataStore.footerProps,
    chartSettings: metadataStore.chartProps
  };
}
@inject(getProps)
@observer
class ConnectedPresentation extends Component {
  render() {
    return (
      <Presentation
        {...this.props}
        renderFooter={footerProps => <SlideFooter {...footerProps} />}
      />
    );
  }
}

export default ConnectedPresentation;
