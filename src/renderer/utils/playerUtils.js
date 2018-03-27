const isDev = require('electron-is-dev');
import { host } from './host';
export function buildFigureUrl(url) {
    return isDev && host.includes('localhost') ? host + url : url;
}
