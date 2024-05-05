import React from "react";
import PlaybackDescription from "./PlaybackDescription.jsx";
import "./SlideMetadata.css";
import SlideNumber from "./SlideNumber.jsx";

function SlideMetadata({
  slideNumberText,
  playbackMode,
  playbackDuration,
  playbackUnit
}) {
  return (
    <section className="slide-metadata">
      <SlideNumber>{slideNumberText}</SlideNumber>
      <PlaybackDescription
        mode={playbackMode}
        duration={playbackDuration}
        unit={playbackUnit}
      />
    </section>
  );
}

export default SlideMetadata;
