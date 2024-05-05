import React from "react";
import PlayButton from "./PlayButton.jsx";
import Toolbar from "./Toolbar";
import ToolbarGroup from "./ToolbarGroup";
import PreviewButton from "./PreviewButton";
import FlexSpacer from "./FlexSpacer";
import "./PreviewToolbar.css";

function PreviewToolbar({
  playbackDisabled,
  onPlayClick,
  onPlayFromStartClick
}) {
  return (
    <Toolbar className="preview-toolbar">
      <ToolbarGroup>
        <PreviewButton />
      </ToolbarGroup>
      <FlexSpacer />
      <ToolbarGroup align="right">
        <PlayButton
          id="playFromStart"
          text="Play from start"
          disabled={playbackDisabled}
          onClick={onPlayFromStartClick}
        />
        <PlayButton
          id="play"
          text="Play"
          onClick={onPlayClick}
          disabled={playbackDisabled}
        />
      </ToolbarGroup>
    </Toolbar>
  );
}

export default PreviewToolbar;
