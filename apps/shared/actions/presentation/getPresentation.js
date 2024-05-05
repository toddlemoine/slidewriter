import * as agents from '../../agents';
import { ensureOriginAndId } from '../../helpers/presentationFile';
import { ORIGIN_LOCAL } from '../../constants';

const handlers = {
    [ORIGIN_LOCAL]: id => agents.local.getItem(id),
};

function getPresentation(id, origin) {
    const handler = handlers[origin];

    if (!handler) {
        throw Error(`No handlers associated with origin ${origin.toString()}.`);
    }

    return handler(id).then(src => {
        return ensureOriginAndId(src, origin.toString(), id, {
            partsOnly: true,
        });
    });
}

export default getPresentation;
