import localforage from 'localforage';

const store = localforage.createInstance({
  name: 'swio'
});

export function getItem(key) {
  return store.getItem(key).catch(err => console.log('error get item', err));
}

export function setItem(key, val) {
  return store.setItem(key, val);
};

export function removeItem(key) {
  return store.removeItem(key);
}

export default {
  getItem,
  setItem,
  removeItem,
  fetch: getItem
}
