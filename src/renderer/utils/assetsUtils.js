import isDev from 'electron-is-dev';
import Debug from 'debug';

const debug = Debug('fabnavi:assets');

export const assetsPath = isDev ? '' : __dirname.replace(/app\.asar$/, 'static');
