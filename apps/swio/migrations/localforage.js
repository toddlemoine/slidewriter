import localforage from "localforage";
import { setItem } from "../../shared/agents/local.js";
import { assemblePresentationFile } from "../../shared/helpers/presentationFile.js";

const legacyStore = localforage.createInstance();

function frontMatterFromOldStores(styles, playback) {
  return { ...styles, ...playback };
}

function migrateFromLocalforage() {
  const sourcePromise = legacyStore.getItem("source");
  const stylesPromise = legacyStore.getItem("styles");
  const playbackPromise = legacyStore.getItem("playback");

  return Promise.all([sourcePromise, stylesPromise, playbackPromise])
    .then(([source, styles, playback]) => {
      legacyStore.dropInstance();

      if (!source) {
        return "";
      }

      const metadata = frontMatterFromOldStores(styles, playback);
      const file = assemblePresentationFile(source, metadata);
      return setItem("source", file);
    })
    .catch(err => {
      console.error("Error migrating", err);
    });
}

export default migrateFromLocalforage;
