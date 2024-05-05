export function isFirefox() {
  return Boolean(document.mozFullScreenEnabled);
}

export function isWebkitOrEdge() {
  return Boolean(document.webkitFullscreenEnabled);
}

export function browserCSSClasses() {
  if (isFirefox()) return "moz";
  if (isWebkitOrEdge()) return "webkit";
  return null;
}

export function addBrowserCSSClasses(element) {
  const classes = browserCSSClasses();

  if (classes) {
    element.classList.add(`${classes}-fullscreen`);
  }
}
