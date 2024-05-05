import { PRESENTATION_FILENAME, PRESENTATION_ASSETS_FOLDER, PRESENTATION_PREVIEWS_FOLDER } from '../constants';

function join(...args) {
    return args.join('/');
}

export default function presentationStorageKey(id) {
    return join(id, PRESENTATION_FILENAME);
}

export function imageStorageKey(id, imageFilename) {
    return join(id, PRESENTATION_ASSETS_FOLDER, imageFilename); 
}

export function previewStorageKey(id, previewFilename) {
    return join(id, PRESENTATION_PREVIEWS_FOLDER, previewFilename); 
}
