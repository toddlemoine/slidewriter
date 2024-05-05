const alignmentFlexStyles = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};

export default function alignmentToFlex(val) {
  return alignmentFlexStyles[val] || "center";
}
