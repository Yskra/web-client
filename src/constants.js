// noinspection GrazieInspection,SpellCheckingInspection

export const STATUS = Object.freeze({
  DISCONNECTED: 0,
  CHECKING: 1,
  INVALID_URL: 2,
  NOT_AVAILABLE: 3,
  PENDING_REDIRECT: 4,
  CONNECTED: 5,
});

export const MIRRORS = Object.freeze([
  'http://localhost:8080/', // yskra preview mode
  'https://yskra.app', // production - SSL: Cloudflare universal - GTS Root R4 - From с Wed, 22 Jun 2016 00:00:00 GMT
  'https://yskra.github.io/' // production alt - SSL: \*.github.io - Sectigo Limitedс - From с Mon, 01 Feb 2010 00:00:00 GMT
])
