export function getItem(key) {
    return new Promise((resolve, reject) => {
        const item = sessionStorage.getItem(key);
        if (item) {
            resolve(item);
        } else {
            reject(new Error(`Error getting item with key ${key}`));
        }
    });
}

export function setItem(key, val) {
    return new Promise((resolve, reject) => {
        try {
            sessionStorage.setItem(key, val)
            resolve();
        } catch (err) {
            reject(err);
        }
    })
}
