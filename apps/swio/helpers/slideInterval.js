export function computeSlideInterval(duration, unit) {
  return unit === 'm' ? duration * 60 * 1000 : duration * 1000;
}

export function computeSlideIntervalBasedOnPresentationLength( duration, unit, numSlides ) {
  let seconds;

  if (unit === 's') seconds = duration;
  if (unit === 'm') seconds = duration * 60;
  if (unit === 'h') seconds = duration * 60 * 60;

  return (seconds*1000) / numSlides;
}

