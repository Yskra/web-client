export async function checkAvailability(url, { signal }) {
  return fetch(url, {
    method: 'HEAD',
    signal,
  })
    .then((resp) => resp.ok)
    .catch(() => false);
}
