import throttle from "lodash.throttle";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { isArrowKey, isBackKey, isNextKey } from "../helpers/keys";
import EditorFocusIndicator from "./EditorFocusIndicator.jsx";
import EditorToolbar from "./EditorToolbar.jsx";
import "./SourcePanel.css";
import EditorTabPanel from "./EditorTabPanel";
import AssetsDrawer from "./AssetsDrawer";

function getProps({ store, presentationStore }) {
  return {
    cursorPosition: presentationStore.cursorPosition,
    saveCursorPosition: presentationStore.saveCursorPosition,
    saveEditorState: presentationStore.saveEditorState,
    source: presentationStore.source,
    switchPanels: store.switchPanels,
    showAssets: presentationStore.showAssets
  };
}

@inject(getProps)
@observer
class SourcePanel extends Component {
  constructor(...args) {
    super(...args);
    this.state = { editorHasFocus: false };
  }

  handleEditorChange = () => {
    this.save();
  };

  save = () => {
    const { textareaNode } = this;
    this.props.saveEditorState(textareaNode.value, textareaNode.selectionStart);
  };

  handleKeyUp = e => {
    if (isArrowKey(e.which)) {
      return this.props.saveCursorPosition(this.textareaNode.selectionStart);
    }
  };

  handleKeyDown = e => {
    if (isArrowKey(e.which) || isNextKey(e.which) || isBackKey(e.which)) {
      e.stopPropagation();
      return;
    }
  };

  handleClick = () => {
    return this.props.saveCursorPosition(this.textareaNode.selectionStart);
  };

  handleFocus = () => {
    if (!this.props.active) {
      this.props.switchPanels("slides");
    }
    this.setState({ editorHasFocus: true });
  };

  handleBlur = () => {
    this.setState({ editorHasFocus: false });
  };

  handleScroll = throttle(() => {
    this.setState({
      showScrollShadow: this.textareaNode.scrollTop > 0
    });
  }, 250);

  setTextareaRef = node => {
    if (node) {
      node.addEventListener("keydown", this.handleKeyDown);
      node.focus();
      this.textareaNode = node;
    } else {
      this.textareaNode.removeEventListener("keydown", this.handleKeyDown);
    }
  };

  handleAssetsDrawerBlur = () => {
    this.toolbar.current.focusImagesButton();
  };

  render() {
    const { active, source, showAssets } = this.props;
    const headerClasses = this.state.showScrollShadow ? "shadow" : "";

    return (
      <EditorTabPanel className="source-panel" hidden={!active}>
        <header className={headerClasses}>
          <EditorToolbar ref={this.toolbar} />
          {showAssets && <AssetsDrawer onBlur={this.handleAssetsDrawerBlur} />}
          <EditorFocusIndicator active={this.state.editorHasFocus} />
        </header>
        <textarea
          id="editor"
          spellCheck="true"
          aria-describedby="editor-help"
          value={source}
          ref={this.setTextareaRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onScroll={this.handleScroll}
          onClick={this.handleClick}
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleEditorChange}
        />
      </EditorTabPanel>
    );
  }
}

export default SourcePanel;
