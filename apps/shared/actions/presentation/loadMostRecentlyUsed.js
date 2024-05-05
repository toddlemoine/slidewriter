import * as agents from '../../agents';
import { MRU_KEY } from '../../constants';
import { extractBodyAndMetadata } from '../../helpers/presentationFile';

const lookupMRU = {
    local: () => agents.local.getItem(MRU_KEY),
};

function loadMostRecentlyUsed(origin) {
    const getItem = agents[origin].getItem;
    const getMRU = lookupMRU[origin];

    if (!getItem || !getMRU) {
        throw Error(`No handlers associated with origin ${origin}.`);
    }

    return getMRU().then(id => {
        return getItem(id).then(source => {
            if (!source) {
                throw Error(`Source is null for id ${id}`);
            }
            return extractBodyAndMetadata(source);
        });
    });
}

export default loadMostRecentlyUsed;
