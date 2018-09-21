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
 * @param  {TextTrack[]} textTracks VTT用のCueの配列
 * @param  {String} type Text Trackの種類
 * @return {String}     VTTの文字列
 */
function createVttText(textTracks, type) {
    const vtt = new Vtt();
    switch(type) {
        case 'captions':
            textTracks.reverse().forEach(textTrack => vtt.add(textTrack.start_sec, textTrack.end_sec, textTrack.text));
            break;
        case 'chapters':
            textTracks.forEach(textTrack => vtt.add(textTrack.start_sec, textTrack.end_sec, textTrack.name));
            break;
        default:
            console.warn(`in 'createVttText()', type should be 'captions' or 'chapters'.your put '${type}'.`)
            break;
    }
    return vtt.toString();
}

/**
 * getVttUrl - description
 *
 * @param  {TextTrack[]} textTracks VTT用のCueの配列
 * @param  {String} type Text Trackの種類
 * @return {String}     Blob URL
 */
function getVttUrl(textTracks, type) {
    return createBlobUrl(createVttText(textTracks, type), 'text/vtt');
}


/**
 * buildCaptions - Videojsのplayer用にCaption Objectを作成して返す
 *
 * @param  {Caption} captions  VTT用のCueの配列
 * @return {Object}    Videojsのplayer用のCaption Object
 */
export function buildCaptions(captions) {
    if(!captions) return;
    return {
        kind: 'captions',
        srclang: 'ja',
        label: '日本語',
        mode: 'showing', // <track>のdefault attribute に相当
        src: getVttUrl(captions, 'captions')
    }
}

/**
 * buildChapters - Videojsのplayer用にChapter Objectを作成して返す
 *
 * @param  {Chapter} chapters  VTT用のCueの配列
 * @return {Object}    Videojsのplayer用のChapter Object
 */
export function buildChapters(chapters) {
    if(!chapters) return;
    return {
        kind: 'chapters',
        srclang: 'ja',
        label: 'Chapter',
        mode: 'showing', // <track>のdefault attribute に相当
        src: getVttUrl(chapters, 'chapters')
    }
}

export function buildFigureUrl(url) {
    return isDev && host.url.includes('localhost') ? host.url + url : url;
}


/**
 * secondsToHHMMSS - 秒数をHH:MM:SSのstringに変換する
 * based on : https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript#comment57297644_25279340
 *
 * @param  {Number} seconds 秒数
 * @return {String}         'HH:MM:SS'形式のstring
 */
export function secondsToHHMMSS(seconds) {
    if(typeof seconds !== 'number') return '00:00:00';
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}
