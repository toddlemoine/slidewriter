export const PLAY_PRESENTATION = ['meta enter', 'Play presentation'];
export const PLAY_PRESENTATION_FROM_START = ['meta shift enter', 'Play presentation from start'];
export const NEXT_SLIDE = ['right,enter,space', 'Next slide'];
export const PREV_SLIDE = ['left,backspace,delete', 'Previous slide'];
export const EXIT_PRESENTATION = ['esc', 'Quit presentation'];
export const SHOW_HELP = ['meta /', 'Show help'];

// Everywhere
// export const SHOW_ACCESSIBILITY_MENU = ['alt /', 'Show accessibility menu'];

export const everywhereKeys = [
  PLAY_PRESENTATION,
  PLAY_PRESENTATION_FROM_START,
  SHOW_HELP
];

export const presentationKeys = [
  NEXT_SLIDE,
  PREV_SLIDE,
  EXIT_PRESENTATION
];

export const MRU_KEY = 'mru';