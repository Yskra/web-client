export function validateUrl(url) {
  return /^(https?:\/\/)(.+?)(\.(.+?))?(\/.*)*$/.test(url);
}
