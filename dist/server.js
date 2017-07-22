'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _youtubeDl = require('youtube-dl');

var _youtubeDl2 = _interopRequireDefault(_youtubeDl);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Constants
var PORT = 8080;
var HOST = '0.0.0.0';

// App
var app = (0, _express2.default)();
app.get('/', function (req, res) {
    res.send('Jose is the bomb. Period\n');
    console.log(req.query('videoId'));
});

app.get('/audio', function (req, res) {
    downloadVideo(req.param('videoId'), function (err, fileName) {
        console.log('done downloading video ', fileName);
        res.sendFile(_path2.default.resolve(__dirname + '/../' + fileName));
    });
});

app.get('/file', function (req, res) {
    res.sendfile(_path2.default.resolve(__dirname + '/../helloWorld.txt'));
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);
var downloadVideo = function downloadVideo(videoId, callback) {
    var videoName = videoId + '.%(ext)s';
    var url = 'https://www.youtube.com/watch?v=' + videoId;
    _youtubeDl2.default.exec(url, ['-x', '--audio-format', 'mp3', '-o', videoName], {}, function (err, output) {
        if (err) throw err;
        //console.log(output.join('\n'));
        console.log('something happened');
        console.log(output);
        callback(err, videoId + '.mp3');
    });
};