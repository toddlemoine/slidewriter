import { getItem } from '../../agents/session';

export default function getStashedPresentation(id) {
    return getItem(id);
}