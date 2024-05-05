import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PlaybackPanel from "../components/PlaybackPanel.jsx";
import SourcePanel from "../components/SourcePanel.jsx";
import StylesPanel from "../components/StylesPanel.jsx";
import FooterPanel from "../components/FooterPanel.jsx";
import "./Editor.css";
import EditorTabBar from "./EditorTabBar";

function getProps({ store }) {
  return {
    sourcePanelActive: store.sourcePanelActive,
    stylesPanelActive: store.stylesPanelActive,
    footerPanelActive: store.footerPanelActive,
    playbackPanelActive: store.playbackPanelActive
  };
}

@inject(getProps)
@observer
class Editor extends Component {
  render() {
    const { props } = this;
    return (
      <div className="editor">
        <EditorTabBar orientation="vertical" />
        <section className="editor-panels">
          {props.playbackPanelActive && <PlaybackPanel />}
          {props.stylesPanelActive && <StylesPanel />}
          {props.footerPanelActive && <FooterPanel />}
          <SourcePanel active={props.sourcePanelActive} />
        </section>
      </div>
    );
  }
}

export default Editor;
