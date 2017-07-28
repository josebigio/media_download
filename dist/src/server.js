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
var DOWNLOAD_DIR = _path2.default.resolve(__dirname + '/../../downloads/');

// App
var app = (0, _express2.default)();

// Routes
app.get('/', function (req, res) {
    res.send('Jose is the bomb. Period\n');
});

app.get('/audio', function (req, res) {
    getVideo(req.param('videoId'), function (err, filePath) {
        console.log('done downloading video ', filePath);
        res.sendFile(filePath);
    });
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);

// Helper functions
var getVideo = function getVideo(videoId, callback) {

    var filePath = getFilePathIfExists(videoId);
    if (filePath) {
        console.log('file already exists, not downloading');
        callback(null, filePath);
        return;
    }
    console.log('file already exists, downloading...');
    var videoName = DOWNLOAD_DIR + "/" + videoId + '.%(ext)s';
    var url = 'https://www.youtube.com/watch?v=' + videoId;

    _youtubeDl2.default.exec(url, ['-x', '--audio-format', 'mp3', '-o', videoName], {}, function (err, output) {
        if (err) throw err;
        console.log(output);
        callback(err, getFilePathIfExists(videoId));
    });
};

var getFilePathIfExists = function getFilePathIfExists(videoId) {
    var filePath = DOWNLOAD_DIR + '/' + videoId + '.mp3';
    return _fs2.default.existsSync(filePath) ? filePath : null;
};