import React from "react";
import "./FilesListItemTitle.css";

export default function FilesListItemTitle({ title, id, path, onClick }) {
  return (
    <a
      href={path}
      className="files-list-item-title"
      onClick={e => onClick(e, id)}
    >
      {title || "Untitled Presentation"}
    </a>
  );
}
