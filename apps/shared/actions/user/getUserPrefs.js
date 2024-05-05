import * as agents from '../../agents';
import { ORIGIN_LOCAL, LOCAL_USERPREFS_KEY } from '../../constants';

const handlers = {
    [ORIGIN_LOCAL]: () => agents.local.getItem(LOCAL_USERPREFS_KEY),
};

export default function getUserPrefs(origin) {
    const handler = handlers[origin];

    if (!handler) {
        throw Error(`[getUserPrefs] No handler found for origin ${origin}.`);
    }

    return handler();
}
