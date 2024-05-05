export default function bestChartFontSize(height) {
  if (height <= 275) return 12;
  if (height <= 500) return 14;
  if (height <= 750) return 18;
  if (height <= 1000) return 24;
  return 30;
}
