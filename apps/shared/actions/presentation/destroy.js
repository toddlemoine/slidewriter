import { ORIGIN_LOCAL, LOCAL_INDEX_KEY } from '../../constants';
import * as agents from '../../agents';
import { removeFromLocalIndex } from '../../helpers/localIndex';

const handlers = {
    [ORIGIN_LOCAL]: id => {
        const agent = agents.local;
        return Promise.all([
            agent.getItem(LOCAL_INDEX_KEY),
            agent.removeItem(id),
        ]).then(([index]) =>
            agent.setItem(LOCAL_INDEX_KEY, removeFromLocalIndex(index, id)),
        );
    },
};

export default function destroy(id, origin) {
    if (!id) {
        throw Error(
            'A valid presentation id must be provided to delete a presentation file.',
        );
    }

    const handler = handlers[origin];

    if (!handler) {
        throw Error(`No handler found for origin ${origin}`);
    }

    return handler(id);
}
