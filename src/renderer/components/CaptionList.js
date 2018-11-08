const{ ipcRenderer } = require('electron');
import React from 'react';
import PropTypes from 'prop-types';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

import { assetsPath } from '../utils/assetsUtils'
import { getVttUrl } from '../utils/playerUtils'

import Caption from './Caption'

import {
    StyledCaptionList,
    StyledList,
    StyledDownloadButton,
} from '../stylesheets/application/ProjectShow/CaptionList';

import {
    StyledHead
} from '../stylesheets/application/ProjectShow/StyledProjectDetail';


const downloadIcon = `${assetsPath}/images/download.svg`;

const downloadFile = async (zip, url, index) => {
    return new Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent(url, (error, data) => {
            if(error) reject(error);
            zip.file(`${index}.vtt`, data, { binary: true });
            resolve(data);
        })
    })
};

const downloadFiles = async (zip, vttList) => {
    return Promise.all(vttList.map((vtt) => downloadFile(zip, vtt.url, vtt.index)));
};

const createVttList = (figures) => {
    return figures.map((figure, index) => (
        {
            url: getVttUrl(figure.captions, 'captions'),
            index: index + 1
        }
    ));
};

const createZipURL = async (figures) => {
    const vttList = createVttList(figures);
    const zip = new JSZip();
    await downloadFiles(zip, vttList);
    const blob = await zip.generateAsync({ type: 'blob' });
    return URL.createObjectURL(blob);
}


export default function CaptionList({ figures, contentType }) {
    return (
        <StyledCaptionList>
            <StyledHead>
                Captions
                <StyledDownloadButton src={downloadIcon} onClick={async () => {
                    const url = await createZipURL(figures);
                    ipcRenderer.send('download', {
                        url: url,
                        properties: { saveAs: true }
                    })
                }} />
            </StyledHead>
            <StyledList>
                {
                    figures.map((figure, figureIndex) => (
                        {
                            entities: figure.captions.sort((a, b) => (a.start_sec - b.start_sec)),
                            figureIndex
                        }
                    )).map((captions) => {
                        return captions.entities.map((caption, index) => (
                            <Caption
                                caption={caption}
                                figureIndex={captions.figureIndex}
                                isLast={(index === captions.entities.length - 1)}
                                contentType={contentType}
                                key={index}
                            />
                        ))
                    })
                }
            </StyledList>
        </StyledCaptionList>
    );
}

CaptionList.propTypes = {
    figures: PropTypes.array,
    contentType: PropTypes.string
};
