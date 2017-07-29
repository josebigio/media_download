import fs from 'fs';
import ytdl from 'youtube-dl';
import express from 'express';
import path from 'path';
import axios from 'axios';

//Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const DOWNLOAD_DIR = path.resolve(__dirname + '/../../downloads/');
const YOUTUBE_API_KEY = "AIzaSyAihlKnwXV_zqg7Sn2TBsZHKwPglURaqBA";


// App
const app = express();

// Routes
app.get('/', (req, res) => {
    res.send('Jose is the bomb. Period\n');
});

app.get('/audio', (req, res) => {
    getVideo(req.param('videoId'), (err, filePath) => {
        console.log('done downloading video ', filePath);
        res.sendFile(filePath);
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Helper functions
const getVideo = (videoId, callback) => {

    const filePath = getFilePathIfExists(videoId);
    if(filePath) {
        console.log('file already exists, not downloading');
        callback(null,filePath);
        return;
    }
    console.log('file does not exists, downloading...');
    const videoName = DOWNLOAD_DIR + "/" + videoId + '.%(ext)s';
    const url = 'https://www.youtube.com/watch?v=' + videoId;
   
    ytdl.exec(url, ['-x', '--audio-format', 'mp3', '-o', videoName], {}, function (err, output) {
        if (err) throw err;
        console.log(output);
        callback(err, getFilePathIfExists(videoId));
    });
}

const getFilePathIfExists = (videoId) => {
    const filePath = `${DOWNLOAD_DIR}/${videoId}.mp3`
    return fs.existsSync(filePath) ? filePath : null;
}

