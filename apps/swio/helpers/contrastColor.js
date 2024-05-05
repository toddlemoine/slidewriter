function luminanceLevel(r, g, b) {
  return [0.299 * r, 0.587 * g, 0.114 * b].reduce((a, b) => a + b) / 255;
}

export function hexToLuma(color) {
  const hex = color.replace(/#/, "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return rgbToLuma(r, g, b);
}

function parseRGBValues(color = "") {
  const values = color.match(/\((.*)\)/);
  return values
    ? values[1].split(",").map(val => parseInt(val.trim(), 10))
    : [0, 0, 0];
}

function isHexColor(color = "") {
  return color[0] === "#";
}

function isRGBColor(color = "") {
  return color.trim().startsWith("rgb");
}

export default function colorContrast(color) {
  if (isHexColor(color)) return hexToLuma(color);
  if (isRGBColor(color)) return rgbToLuma(...parseRGBValues(color));
  return rgbToLuma(255, 255, 255);
}

export function rgbToLuma(r, g, b) {
  const brightness = luminanceLevel(r, g, b);
  return brightness < 0.5 ? "dark" : "light";
}
