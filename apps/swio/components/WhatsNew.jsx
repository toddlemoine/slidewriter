import marked from "marked";
import { inject } from "mobx-react";
import React, { Component } from "react";
import { get } from "../../shared/agents/fetch.js";
import bolt from "../../shared/assets/bolt.svg";
import SidePanel from "./SidePanel.jsx";
import SomethingWentWrongError from "./SomethingWentWrongError.jsx";
import "./WhatsNew.css";

@inject("store")
class WhatsNew extends Component {
  constructor() {
    super();
    this.state = { content: null, error: false };
  }
  componentWillMount() {
    get("/assets/whats-new.md")
      .then(content => this.setState({ content }))
      .catch(() => this.setState({ error: true }));
  }
  handleCloseClick = () => {
    this.props.store.toggleWhatsNew(false);
  };

  render() {
    const html = marked(this.state.content || "");
    const content = this.state.error ? (
      <SomethingWentWrongError />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    );
    return (
      <SidePanel
        className="whats-new"
        title="What's New"
        iconSvg={bolt}
        onClose={this.handleCloseClick}
      >
        {content}
      </SidePanel>
    );
  }
}

export default WhatsNew;
