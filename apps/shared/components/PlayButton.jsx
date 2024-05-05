import React from "react";
import PrimaryButton from "./PrimaryButton.jsx";
import "./PlayButton.css";
import PlayIcon from "./icons/PlayIcon";

function PlayButton({ id, onClick, text = "Play", disabled }) {
  return (
    <PrimaryButton
      id={id}
      className="play-button"
      disabled={disabled}
      onClick={onClick}
    >
      <PlayIcon /> {text}
    </PrimaryButton>
  );
}

export default PlayButton;
