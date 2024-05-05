import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import SlideNumber from "../../shared/components/SlideNumber";

function getProps({ presentationStore }) {
  return {
    text: presentationStore.currentSlideNumberText
  };
}

@inject(getProps)
@observer
class ConnectedSlideNumber extends Component {
  render() {
    return <SlideNumber>{this.props.text}</SlideNumber>;
  }
}

export default ConnectedSlideNumber;
