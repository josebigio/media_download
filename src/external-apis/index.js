import axios from 'axios'
import { YOUTUBE_API_KEY } from '../constants'

const VIDEO_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

export const searchPodCast = (query, maxResults = 5) => {
    const request = `${VIDEO_SEARCH_URL}?key=${YOUTUBE_API_KEY}&part=snippet&q=${query}&order=date&maxResults=${maxResults}`;
    return axios.get(request)
        .then((responce) => {
            console.log('VIDEO_SEARCH_URL', responce);
            return responce.data.items
                .map((item) => {
                    const result = {
                        title: item.snippet.title,
                        videoId: item.id.videoId
                    }
                    return result;
                });

        });
}

