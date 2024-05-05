// Migrate from Slidewriter.io v1 style localforage
import { getItem, setItem, removeItem } from '../../shared/agents/local';
import create from '../../shared/actions/presentation/create';
import guessTitleFromPresentation from "../../shared/helpers/guessTitleFromPresentation";

function migrateFromVersion1() {
        return getItem('source')
        .then((oldSource) => {
            if (oldSource) {
                removeItem('source');
                const title = guessTitleFromPresentation(oldSource);
                return create('local', oldSource, title);
            }
        })
}

export default migrateFromVersion1;