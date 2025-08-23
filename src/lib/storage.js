import { ref } from './reactive.js';

const redirectedInit = sessionStorage.getItem('redirected');
const yskraUrlInit = localStorage.getItem('url');
const autoConnectInit = localStorage.getItem('autoConnect');

const redirected = ref(redirectedInit === null ? false : redirectedInit === 'true');
const yskraUrl = ref(yskraUrlInit ?? '');
const autoConnect = ref(autoConnectInit === null ? true : autoConnectInit === 'true');

yskraUrl.subscribe((value) => {
  localStorage.setItem('url', value);
});
autoConnect.subscribe((value) => {
  localStorage.setItem('autoConnect', value);
});
redirected.subscribe((value) => {
  sessionStorage.setItem('redirected', value);
});

export {
  autoConnect,
  redirected,
  yskraUrl,
};
