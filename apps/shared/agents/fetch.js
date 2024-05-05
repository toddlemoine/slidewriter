export function get(resourcePath, options = {}) {
    return fetch(resourcePath, options).then(resp => {
        return resp.text();
    });
}

export default {
    get,
};
