/** @import {Status} from './types/app' */

import { MIRRORS, STATUS } from './constants.js';
import { createFormManager } from './lib/fornManager';
import { t, translateNodes } from './lib/in18n';
import { createKeyboardNav } from './lib/keyboardNav.js';
import { ref } from './lib/reactive.js';
import { autoConnect, redirected, yskraUrl } from './lib/storage.js';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import './main.css';

const $from = document.querySelector('#urlForm');
const $button = $from.querySelector('button');
const $status = $from.querySelector('#connect-status');
const $autoConnect = $from.querySelector('#auto-connect');
const $i18nNodes = document.querySelectorAll('[data-i18n]');
const $focusable = document.querySelectorAll('input, button, a');

$from.querySelector('input').value = yskraUrl.get();
$autoConnect.checked = autoConnect.get();

const { submit, status } = createFormManager();
const { init: initKeyboardNav, destroy: destroyKeyboardNav } = createKeyboardNav($focusable);
const url = ref(yskraUrl.get());

translateNodes($i18nNodes);
$from.addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input').value;

  if (!input) {
    return;
  }
  url.set(input);
  await submit(input);
});
$autoConnect.addEventListener('change', () => {
  autoConnect.set($autoConnect.checked);
});
initKeyboardNav();

status.subscribe((status) => {
  switch (status) {
    case STATUS.DISCONNECTED:
      $button.textContent = t('connect');
      $status.textContent = '';
      break;

    case STATUS.CHECKING:
      $button.textContent = t('cancel');
      $status.textContent = t('checking');
      break;

    case STATUS.INVALID_URL:
      $button.textContent = t('connect');
      $status.textContent = t('invalid_url');
      break;

    case STATUS.NOT_AVAILABLE:
      $button.textContent = t('connect');
      $status.textContent = t('not_available');
      console.log('not available:', url.get());
      break;

    case STATUS.PENDING_REDIRECT:
      $button.textContent = t('cancel');
      $status.textContent = t('preparing_connection');
      break;

    case STATUS.CONNECTED:
      $button.textContent = t('cancel');
      $status.textContent = t('connected');
      break;

    default:
      break;
  }
});

status.subscribe((status) => {
  if (status === STATUS.CONNECTED) {
    redirected.set(true);
    yskraUrl.set(url.get());
    window.open(url.get(), '_self');
  }
});

document.addEventListener('onbeforeunload', () => {
  destroyKeyboardNav();
});

if (autoConnect.get() && !redirected.get() && url.get()) {
  submit(url.get());
}

(async () => {
  if (!url.get()) {
    for (const u of MIRRORS) {
      $from.querySelector('input').value = u;
      url.set(u);
      await submit(u);
    }
  }
})()
