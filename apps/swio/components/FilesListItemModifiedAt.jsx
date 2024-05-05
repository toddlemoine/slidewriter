import React from "react";
import "./FilesListItemModifiedAt.css";

export default function FilesListItemModifiedAt({ value }) {
  return (
    <div className="files-list-item-modified-at">
      Last saved on {value.toDateString()}
    </div>
  );
}
