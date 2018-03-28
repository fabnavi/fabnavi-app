const Vtt = require('vtt-creator');
const isDev = require('electron-is-dev');
import { host } from './host';

function createBlobUrl(content, { mimetype = 'text/plain' }) {
    const props = { type: mimetype };
    const contents = Array.isArray(content) ? content : [content];
    const blob = new Blob(contents, props);
    return URL.createObjectURL(blob);
}


/**
* @typedef {Object} Caption
* @property {Number} start_sec start is described in sec
* @property {Number} end_sec end is described in sec
* @property {String} text text is json or
 */

/**
 * createVttText - description
 *
 * @param  {Caption[]} captions VTT用のCueの配列
 * @return {String}     VTTの文字列
 */
function createVttText(captions) {
    const vtt = new Vtt();
    captions.forEach(caption => vtt.add(caption.start_sec, caption.end_sec, caption.text));
    return vtt.toString();
}

/**
 * getVttUrl - description
 *
 * @param  {Caption[]} captions VTT用のCueの配列
 * @return {String}     Blob URL
 */
function getVttUrl(captions) {
    return createBlobUrl(createVttText(captions), 'text/vtt');
}


/**
 * buildCaptions - Videojsのplayer用にCaption Objectを作成して返す
 *
 * @param  {Caption} captions  VTT用のCueの配列
 * @return {Object}    Videojsのplayer用のCaption Object
 */
export function buildCaptions(captions) {
    return {
        kind: 'captions',
        srclang: 'ja',
        label: '日本語',
        mode: 'showing', // <track>のdefault attribute に相当
        src: getVttUrl(captions)
    }
}


export function buildFigureUrl(url) {
    return isDev && host.includes('localhost') ? host + url : url;
}
