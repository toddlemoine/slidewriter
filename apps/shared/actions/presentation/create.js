import save from '../../actions/presentation/save';
import uuidV4 from 'uuid/v4';
import guessTitleFromPresentation from '../../helpers/guessTitleFromPresentation';
import { ORIGIN_LOCAL } from '../../constants';
import generatePresentationSource from '../../helpers/generatePresentationSource';

const defaultPresentation = (source = generatePresentationSource(), title) => {
    return {
        source,
        title: title || guessTitleFromPresentation(source),
    };
};

const handlers = {
    [ORIGIN_LOCAL]: (src, title) => {
        return save({
            ...defaultPresentation(src, title),
            id: uuidV4(),
            origin: 'local',
        });
    },
};

export default function create(origin, src, title) {
    const handler = handlers[origin];

    if (!handler) {
        throw Error(`No create handler found for origin ${origin}`);
    }

    return handler(src, title);
}
