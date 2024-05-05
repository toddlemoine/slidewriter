import React from "react";
import ToolbarGroup from "../../shared/components/ToolbarGroup";
import Toolbar from "../../shared/components/Toolbar";
import OpenFilesButton from "./activityBar/OpenFilesButton";
import NewPresentationButton from "./activityBar/NewPresentationButton";

export default function FileToolbar() {
  return (
    <Toolbar className="file-toolbar">
      <ToolbarGroup className="file-toolbar-group">
        <NewPresentationButton />
        <OpenFilesButton />
      </ToolbarGroup>
    </Toolbar>
  );
}
