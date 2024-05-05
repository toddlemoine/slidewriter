import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import "./AssetsDrawer.css";
import PrimaryButton from "../../shared/components/PrimaryButton";
import readFilenameFromPath from "../../shared/helpers/readFilenameFromPath";
import FlexSpacer from "../../shared/components/FlexSpacer";
import { isTab, isShiftTab, isRight, isLeft } from "../helpers/keys";

function props({ hub, presentationStore }) {
  return {
    getPresentationPreviews: hub.getPresentationPreviews,
    previews: hub.previews,
    insertImages: hub.addToImages,
    closeDrawer: presentationStore.toggleAssets
  };
}

@inject(props)
@observer
class AssetsDrawer extends Component {
  state = {
    selected: new Set(),
    focusIndex: 0
  };

  constructor() {
    super();
    this.list = React.createRef();
    this.addButton = React.createRef();
  }
  componentDidMount() {
    this.props.getPresentationPreviews();
  }

  componentDidUpdate() {
    this.focusPreview();
  }

  focusPreview() {
    const item = this.list.current.childNodes[this.state.focusIndex];
    if (item) {
      item.querySelector("button").focus();
    }
  }

  focusNext() {
    const currentFocusIndex = this.state.focusIndex;
    const focusIndex =
      currentFocusIndex === this.list.current.childNodes.length - 1
        ? 0
        : currentFocusIndex + 1;
    this.setState({ focusIndex });
  }

  focusPrevious() {
    const currentFocusIndex = this.state.focusIndex;
    const focusIndex =
      currentFocusIndex === 0
        ? this.list.current.childNodes.length - 1
        : currentFocusIndex - 1;
    this.setState({ focusIndex });
  }

  handleImageClick = e => {
    e.stopPropagation();
    const src = e.target.getAttribute("src");
    this.setState({ focusIndex: this.props.previews.indexOf(src) });
    this.toggleSelected(src);
  };

  handleImageButtonClick = e => {
    this.toggleSelected(e.target.firstChild.getAttribute("src"));
  };

  toggleSelected(src) {
    const selected = new Set(this.state.selected);

    if (selected.has(src)) {
      selected.delete(src);
    } else {
      selected.add(src);
    }

    this.setState({ selected });
  }
  handleInsertClick = () => {
    const selected = Array.from(this.state.selected);
    this.props.insertImages(selected.map(readFilenameFromPath));
    this.setState({ selected: new Set() });
  };

  handleKeyDown = e => {
    if (this.list.current.contains(e.target)) {
      return this.handleItemKeyDown(e);
    }

    if (e.target === this.addButton.current) {
      return this.handleAddButtonKeyDown(e);
    }

    if (isShiftTab(e)) {
      e.preventDefault();
      this.props.onBlur();
    }
  };

  handleAddButtonKeyDown = e => {
    if (isShiftTab(e)) {
      e.preventDefault();
      this.focusPreview();
    }
  };

  handleItemKeyDown = e => {
    if (isRight(e)) {
      e.preventDefault();
      return this.focusNext();
    }
    if (isLeft(e)) {
      e.preventDefault();
      this.focusPrevious();
    }
  };

  cancelImageDrag = e => {
    e.preventDefault();
  };

  getPreviewFilename = src => {
    const file = src
      .split("/")
      .pop()
      .split("?")[0];
    return file;
  };

  render() {
    const { previews } = this.props;
    return (
      <div
        id="assets-drawer"
        className="assets-drawer"
        onKeyDown={this.handleKeyDown}
      >
        <ul ref={this.list} className="assets-drawer-preview-list">
          {previews.map(previewUrl => (
            <li>
              <button
                aria-label={`${
                  this.state.selected.has(previewUrl) ? "Deselect" : "Select"
                } image file ${this.getPreviewFilename(previewUrl)} `}
                tabIndex={-1}
                aria-pressed={this.state.selected.has(previewUrl)}
                onClick={this.handleImageButtonClick}
              >
                <img
                  onDragStart={this.cancelImageDrag}
                  onClick={this.handleImageClick}
                  src={previewUrl}
                />
              </button>
            </li>
          ))}
        </ul>
        <div className="assets-drawer-buttonbar">
          <PrimaryButton
            ref={this.addButton}
            disabled={this.state.selected.size === 0}
            onClick={this.handleInsertClick}
          >
            Add to presentation
          </PrimaryButton>
          <FlexSpacer />
        </div>
      </div>
    );
  }
}

export default AssetsDrawer;
