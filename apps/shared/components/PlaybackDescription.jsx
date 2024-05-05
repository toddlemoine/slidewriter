import React from "react";
import dattr from "../helpers/dattr";

const units = {
  s: "seconds",
  m: "minutes",
  h: "hours"
};

export default function PlaybackDescription({
  mode = "manual",
  duration,
  unit
}) {
  let text = "";

  if (mode === "slide") {
    text = `Slides advance after ${duration} ${units[unit]}`;
  }

  if (mode === "presentation") {
    text = `Slides advance so presentation lasts ${duration} ${units[unit]}`;
  }

  if (duration === "") {
    text = "";
  }
  return (
    <div className="playback-description" {...dattr("playback-description")}>
      {text}
    </div>
  );
}
