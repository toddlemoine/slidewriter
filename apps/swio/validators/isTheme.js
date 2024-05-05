import isOneOf from './isOneOf';
import themes from '../themes';

export default isOneOf(themes.map(t => t.id));

