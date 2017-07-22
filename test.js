import fs from 'fs';
import ytdl from 'youtube-dl';

const url = 'http://www.youtube.com/watch?v=90AiXO1pAiA';

const download = ytdl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
  if (err) throw err;
  console.log(output.join('\n'));
});

console.log("downloadObject: ", JSON.stringify(download));