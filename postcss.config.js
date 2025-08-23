import nested from 'postcss-nested';
import env from 'postcss-preset-env';

// noinspection JSUnusedGlobalSymbols
export default {
  plugins: [
    nested(),
    env(),
  ],
};
