
const [ LEFT, UP, RIGHT, DOWN ] = [37,38,39,40];
const SPACE = 32;
const BACKSPACE = 8;
const nextKeys = [ SPACE, RIGHT ];
const backKeys = [ BACKSPACE, LEFT ];

export function isLeft({ which }) {
	return which === LEFT;
}

export function isRight({ which }) {
	return which === RIGHT;
}

export function isUp({ which }) {
	return which === UP;
}

export function isDown({ which }) {
	return which === DOWN;
}

export function isNextKey({ which }) {
	return nextKeys.includes(which);
}

export function isBackKey({ which }) {
	return backKeys.includes(which);
}

export function isArrowKey(keyCode) {
	return [ LEFT, UP, RIGHT, DOWN ].includes(keyCode);
}

export function isPlayPresentationCombo(e) {
	return e.key === 'Enter' && e.metaKey;
}

export function isPlayPresentationFromStartCombo(e) {
	return e.key === 'Enter' && e.metaKey && e.shiftKey;
}

export function isTab(e) {
	return e.key === 'Tab'; 
}

export function isShiftTab(e) {
	return isTab(e) && e.shiftKey;
}


