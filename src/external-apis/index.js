import axios from 'axios'
import { YOUTUBE_API_KEY } from '../constants'

const VIDEO_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const COMMENTS_URL = "https://www.googleapis.com/youtube/v3/commentThreads";
const VIDEO_INFO_URL = "https://www.googleapis.com/youtube/v3/videos"


export const searchVideo = (query, maxResults = 5) => {
    const request = `${VIDEO_SEARCH_URL}?key=${YOUTUBE_API_KEY}&part=snippet&q=${query}&maxResults=${maxResults}&type=video`;
    return axios.get(request)
        .then((responce) => {
            //console.log('VIDEO_SEARCH_URL', responce);
            return responce.data.items
                .map((item) => {
                    console.log('ITEM: ', item);
                    const result = {
                        title: item.snippet.title,
                        channelTitle: item.snippet.channelTitle,
                        videoId: item.id.videoId,
                        thumbnails: item.snippet.thumbnails
                    }
                    return result;
                });

        });
}

export const getComments = (videoId) => {
    const request = `${COMMENTS_URL}?key=${YOUTUBE_API_KEY}&part=snippet,replies&videoId=${videoId}&order=relevance&maxResults=100`;
    return axios.get(request)
        .then((responce) => {
            return responce.data.items.map((item) => {
                return item;
            })
        })
}

export const getInfo = (videoId) => {
    const request = `${VIDEO_INFO_URL}?key=${YOUTUBE_API_KEY}&part=statistics,snippet,contentDetails&id=${videoId}`;
    return axios.get(request)
        .then((responce) => {
            if(responce.data.items) {
                const { snippet, contentDetails, statistics } = responce.data.items[0];
                const result = {
                    publication : snippet.publishedAt,
                    title : snippet.title,
                    description : snippet.description,
                    thumbnails : snippet.thumbnails,
                    duration: contentDetails.duration,
                    ...statistics
                }
                return result;
            }
            else {
                throw 'no data found';
            }
        });
}

