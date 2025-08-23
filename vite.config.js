import { execSync, spawn } from 'node:child_process';
import path, { resolve } from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { version } from './package.json';

// noinspection JSUnusedGlobalSymbols
export default defineConfig(({ mode }) => {
  const isEmulator = mode === 'emulator';

  if (isEmulator) {
    startEmulator();
  }

  return {
    base: './',
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
    server: {
      port: 8932,
    },
    build: {
      emptyOutDir: !isEmulator,
      watch: isEmulator ? ({}) : null,
      minify: false,
      target: 'chrome60',
    },
    plugins: [
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': resolve('./src'),
        '@locales': resolve('./locales'),
      },
    },
  };
});

function startEmulator() {
  process.env.LG_WEBOS_STUDIO_SDsK_HOME = path.resolve('.');
  process.env.WEBOS_CLI_TV = execSync(`which node`, { encoding: 'utf-8' }).trim();

  spawn('npx', ['ares-launch', '-s', '24', 'dist'], { stdio: 'inherit' });
}
