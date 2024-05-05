import * as agents from '../../agents';
import { LOCAL_INDEX_KEY, ORIGIN_LOCAL } from '../../constants';
import {
    extractBodyAndMetadata,
    ensureOriginAndId,
} from '../../helpers/presentationFile';
import { updateLocalIndex } from '../../helpers/localIndex';

const originHandlers = {
    [ORIGIN_LOCAL]: (src, id, title) => {
        const agent = agents.local;

        return agent
            .getItem(LOCAL_INDEX_KEY)
            .then(index => {
                return Promise.all([
                    agent.setItem(id, ensureOriginAndId(src, ORIGIN_LOCAL, id)),
                    agent.setItem(
                        LOCAL_INDEX_KEY,
                        updateLocalIndex(index, id, title),
                    ),
                ]);
            })
            .then(([src]) => extractBodyAndMetadata(src));
    },
};

export default function save({ source, id, origin, title }) {
    const handler = originHandlers[origin];

    if (!handler) {
        throw Error(`'No save handler associated with origin ${origin}.`);
    }

    return handler(source, id, title);
}
