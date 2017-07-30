import express from 'express';

import { getVideo } from './utils'
import { PORT, HOST } from './constants'
import { searchVideo } from './external-apis'

// App
const app = express();

// Routes
app.get('/', (req, res) => res.send('Jose is the bomb. Period\n'))

app.get('/audio', (req, res) => {
    getVideo(req.param('videoId'), (error, filePath) => {
        if (error) {
            console.error('error downloading video: !', error)
            res.status(400).send(error);
            return;
        }
        console.log('done downloading video ', filePath);
        res.sendFile(filePath);
    });
});

app.get('/search', (req, res) => {
    const query = req.param('q')
    if (!query) {
        res.send("missing querry param q");
        return;
    }
    searchVideo(query, 10)
        .then(response => {
            const result = {
                results: response
            }
            res.send(result);
        })
        .catch(error => {
            res.status(400).send(error);
        })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
