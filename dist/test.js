'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _youtubeDl = require('youtube-dl');

var _youtubeDl2 = _interopRequireDefault(_youtubeDl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'http://www.youtube.com/watch?v=90AiXO1pAiA';

var download = _youtubeDl2.default.exec(url, ['-x', '--audio-format', 'mp3'], {}, function (err, output) {
  if (err) throw err;
  console.log(output.join('\n'));
});

console.log("downloadObject: ", JSON.stringify(download));