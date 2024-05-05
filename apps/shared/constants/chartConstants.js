import pattern from "patternomaly";

export const colors = [
    "#4285f4",
    "#db4437",
    "#f4b400",
    "#0e9d58",
    "#fe6d01",
    "#46bdc6",
    "#ab2fc4",
    "#c1bc1e",
    "#3949ab",
    "#f974a8",
    "#00685c",
    "#c2175b"
  ];

  export const patterns = [
    "plus",
    "cross",
    "dash",
    "dot",
    "disc",
    "ring",
    "line",
    "weave",
    "zigzag",
    "diagonal",
    "square",
    "triangle"
  ];

export const swatches = patterns.map((p, index) =>
    pattern.draw(p, colors[index])
  );
  
export const defaultAnimationDuration = 400;