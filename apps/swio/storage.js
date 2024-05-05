import storage from 'localforage';

export function getItem(key) {
  return storage.getItem(key);
}

export function setItem(key, val) {
  return storage.setItem(key, val);
}
