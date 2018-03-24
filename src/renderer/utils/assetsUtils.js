import isDev from 'electron-is-dev';
import Debug from 'debug';

const debug = Debug('fabnavi:assets');

debug(__static);

export const assetsPath = isDev ? '' : __dirname.replace(/app\.asar$/, 'static');