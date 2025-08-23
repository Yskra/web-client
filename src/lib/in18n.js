const localesImports = import.meta.glob(['@locales/**/*.json'], {
  import: 'default',
  eager: true,
});
const locales = Object.fromEntries(Object.entries(localesImports).map(([fileName, module]) => [
  // /locale/en-US.json -> en-US
  fileName.replace(/.+\/(.+)\.json$/, '$1'),
  module,
]));

const DEFAULT_LANG = 'en-US';
const navigatorLang = window.navigator.language;

const lang = navigatorLang in locales ? navigatorLang : DEFAULT_LANG;

export function t(key) {
  return locales[lang]?.[key] ?? key;
}

export function translateNodes(nodes) {
  for (const node of nodes) {
    node.textContent = t(node.dataset.i18n);
  }
}
