const isDev = require('electron-is-dev');
export const host = isDev ? 'http://preview.fabnavi.org/' : 'http://fabnavi.org/';
