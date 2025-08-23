import { presetDaisy } from '@ameinhardt/unocss-preset-daisy';
import theme from 'daisyui/functions/variables.js';
import { defineConfig, presetIcons, presetWind3 } from 'unocss';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  separators: [':'],
  theme: { ...theme },
  presets: [
    presetWind3(),
    presetIcons(),
    presetDaisy({
      themes: ['dark --prefersdark  --default'],
    }),
  ],
  extendTheme: (theme) => {
    theme.fontSize.xs[0] = 'var(--text-size-xs)';
    theme.fontSize.sm[0] = 'var(--text-size-sm)';
    theme.fontSize.base[0] = 'var(--text-size-base)';
    theme.fontSize.lg[0] = 'var(--text-size-lg)';
    theme.fontSize.xl[0] = 'var(--text-size-xl)';
    // theme.fontSize['2xl'][0] = 'var(--text-size-2xl)';
  },
});
