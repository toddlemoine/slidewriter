import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classnames from "classnames";
import guessTitleFromPresentation from "../../shared/helpers/guessTitleFromPresentation";
import "./TitleInput.css";

const UNTITLED_PRESENTATION_TITLE = "Untitled";

function getProps({ metadataStore }) {
  return {
    key: metadataStore.title,
    value: metadataStore.title,
    saveTitle: metadataStore.setTitle
  };
}
@inject(getProps)
@observer
class TitleInput extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.text = React.createRef();
    this.state = {
      editing: false,
      value: props.value
    };
  }

  componentDidUpdate(nextProps) {
    if (this.focusOnNextUpdate) {
      this.focusText();
      this.focusOnNextUpdate = false;
    }
  }

  focusInputForEditing = () => {
    requestAnimationFrame(() => {
      this.input.current.focus();
      this.input.current.select();
    });
  };

  focusText = () => {
    this.text.current.focus();
  };

  handleMouseDown = () => {
    this.editing();
  };

  handleInputChange = e => {
    this.setState({ value: e.target.value });
  };

  handleKeyDown = e => {
    if (!this.state.editing && e.keyCode === 32) {
      this.editing();
    }
  };

  handleInputKeyDown = e => {
    if (e.key === "Escape") {
      this.cancel();
    }

    if (e.key === "Enter") {
      this.save();
      this.focusOnNextUpdate = true;
      this.setState({ editing: false }, this.focusText);
    }
  };

  handleInputBlur = e => {
    this.save();
    this.setState({ editing: false });
  };

  handleFocus = () => {
    this.editing();
  };

  cancel() {
    this.setState({ editing: false, value: this.props.value }, this.focusText);
  }

  editing() {
    this.setState({ editing: true }, this.focusInputForEditing);
  }

  save() {
    if (this.state.value !== this.props.value) {
      this.props.saveTitle(this.state.value);
    }
  }
  render() {
    const { value, editing } = this.state;
    const classes = classnames("title-input", {
      editing,
      untitled: value === ""
    });
    return (
      <div
        className={classes}
        tabIndex="0"
        onFocus={this.handleFocus}
        onMouseDown={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}
      >
        {editing ? (
          <input
            ref={this.input}
            type="text"
            required={true}
            readOnly={!editing}
            value={value}
            onBlur={this.handleInputBlur}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
          />
        ) : (
          <span ref={this.text} className="title-input-text">
            {this.props.value || UNTITLED_PRESENTATION_TITLE}
          </span>
        )}
      </div>
    );
  }
}

export default TitleInput;
