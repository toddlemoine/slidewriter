
function handleError(error) {
  console.error('BOOM', error);
}

export function get(resourcePath) {
  return fetch(resourcePath)
    .then(resp => {
      return resp.text();
    })
    .catch(handleError);

}

export default {
  loadSample: () => get('./assets/sample.md')
}
