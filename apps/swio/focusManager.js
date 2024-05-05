export function rememberFocusForNode(node) {
  return () => node.focus();
}

export function rememberFocusForActiveElement() {
  return rememberFocusForNode(document.activeElement);
}
