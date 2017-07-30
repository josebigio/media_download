import fs from 'fs';
import ytdl from 'youtube-dl';

import { DOWNLOAD_DIR, AUDIO_EXTENSION_FORMAT} from '../constants'

export const getFilePathIfExists = (videoId) => {
    const filePath = `${DOWNLOAD_DIR}/${videoId}.${AUDIO_EXTENSION_FORMAT}`
    return fs.existsSync(filePath) ? filePath : null;
}
export const getVideo = (videoId, callback) => {

    const filePath = getFilePathIfExists(videoId);
    if (filePath) {
        console.log('file already exists, not downloading');
        callback(null, filePath);
        return;
    }
    console.log('file does not exists, downloading...');
    const videoName = DOWNLOAD_DIR + "/" + videoId + '.%(ext)s';
    const url = 'https://www.youtube.com/watch?v=' + videoId;

    ytdl.exec(url, ['-x', '--audio-format', 'mp3', '-o', videoName], {}, function (err, output) {
        console.log(output);
        callback(err, getFilePathIfExists(videoId));
    });
}