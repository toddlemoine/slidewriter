function localIndexEntry(id) {
  const ts = timestamp();
  return { id, createdAt: ts, modifiedAt: ts };
}

function timestamp() {
  return new Date().toISOString();
}

export function removeFromLocalIndex(index, id) {
    delete index[id];
    return index;
}

export function updateLocalIndex(index, id, title) {
  const _index = index || {};
  const item = _index[id] || localIndexEntry(id);
  item.modifiedAt = timestamp();
  item.title = title;
  _index[id] = item;
  return _index;
}
