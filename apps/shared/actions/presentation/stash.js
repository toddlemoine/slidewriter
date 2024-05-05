import { setItem } from '../../agents/session';

export default function stash(id, source) {
    return setItem(id, source);
}