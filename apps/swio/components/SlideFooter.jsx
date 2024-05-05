import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import SlideFooter from "../../shared/components/SlideFooter";

function getProps({ metadataStore }) {
  return metadataStore.footerProps;
}

@inject(getProps)
@observer
class ConnectedSlideFooter extends Component {
  render() {
    return <SlideFooter {...this.props} />;
  }
}

export default ConnectedSlideFooter;
