import sortBy from 'lodash.sortby';
import * as agents from '../../agents';
import { ORIGIN_LOCAL, LOCAL_INDEX_KEY } from '../../constants';

const handlers = {
    [ORIGIN_LOCAL]: () =>
        agents.local
            .getItem(LOCAL_INDEX_KEY)
            .then(index => (index ? Object.values(index) : [])),
};

function parseModifiedAt(items) {
    return items.map(item => {
        item.modifiedAt = new Date(item.modifiedAt);
        return item;
    });
}

function sortByModifiedAt(items) {
    return sortBy(items, ['modifiedAt']).reverse();
}

function getPresentations(origin = 'local') {
    const handler = handlers[origin];

    if (!handler) {
        throw Error(`No handlers associated with origin.`);
    }

    return handler().then(items => sortByModifiedAt(parseModifiedAt(items)));
}

export default getPresentations;
