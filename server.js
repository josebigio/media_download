import fs from 'fs';
import ytdl from 'youtube-dl';
import express from 'express';
import path from 'path';

//Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Jose is the bomb. Period\n');
    console.log(req.query('videoId'))
});

app.get('/audio', (req, res) => {
    downloadVideo(req.param('videoId'), (err, fileName) => {
        console.log('done downloading video ', fileName);
        res.sendFile(path.resolve(__dirname + '/../' + fileName));
    });
});

app.get('/file', (req,res)=>{
    res.sendfile(path.resolve(__dirname + '/../helloWorld.txt'));
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
const downloadVideo = (videoId, callback) => {
    const videoName = videoId + '.%(ext)s';
    const url = 'https://www.youtube.com/watch?v=' + videoId;
    ytdl.exec(url, ['-x', '--audio-format', 'mp3', '-o', videoName], {}, function (err, output) {
        if (err) throw err;
        //console.log(output.join('\n'));
        console.log('something happened');
        console.log(output);
        callback(err, videoId + '.mp3');
    });
}