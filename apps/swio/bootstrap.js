import { ORIGIN_LOCAL } from '../shared/constants';
import getUserPrefs from '../shared/actions/user/getUserPrefs';
import getPresentations from '../shared/actions/presentation/getPresentations';
import parsePresentationParams from './helpers/parsePresentationParams';

function getInitialPresentation() {
    return parsePresentationParams(window.location.hash);
}

function initializeLocalUser() {
    return Promise.all([
        { enabled: false },
        getUserPrefs(ORIGIN_LOCAL),
        getPresentations(ORIGIN_LOCAL),
        getInitialPresentation(),
        ORIGIN_LOCAL,
    ]);
}

function resolveBootstrapState(resolve) {
    return ([auth, userPrefs, files, initialPresentation, origin]) =>
        resolve({
            auth,
            userPrefs,
            files,
            initialPresentation,
            origin,
        });
}

// Bootstrap flow
// 1. Check for enabled auth ff
// 2. Load auth and user prefs (or not)
// 3. Initialize action handlers?
// 4. Get files (either local or swio).
// 5. Parse initial state from url.
// 6. Return initial state of application.

export default function bootstrap() {
    return new Promise((resolve, reject) => {
        const resolver = resolveBootstrapState(resolve);
        initializeLocalUser()
            .then(resolver)
            .catch(reject);
    });
}
