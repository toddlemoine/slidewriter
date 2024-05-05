import React from "react";
import SlideNavButton from "./SlideNavButton.jsx";
import "./PreviewNavigation.css";

export default function PreviewNavigation({
  back,
  backEnabled,
  next,
  nextEnabled
}) {
  return (
    <section className="preview-navigation">
      <SlideNavButton
        id="previousSlide"
        disabled={!backEnabled}
        onClick={back}
        label="Go to previous slide"
      >
        {"\u276E"}
      </SlideNavButton>

      <SlideNavButton
        id="nextSlide"
        disabled={!nextEnabled}
        onClick={next}
        label="Go to next slide"
      >
        {"\u276F"}
      </SlideNavButton>
    </section>
  );
}
