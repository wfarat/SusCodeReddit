import {v4} from 'uuid';
var auth;
const state = v4();
const clientID = "U9g_qwSTfjs9q7lQNHeNEA";
const redirectURI = "https://suscodered.netlify.app";
const Reddit = {
    async search(term) {
        const accessToken = Reddit.getAccessToken();
        const urlToFetch = 'https://oauth.reddit.com/api/subreddit_autocomplete?query=' + term + '&include_profiles=false';
        const response = await fetch (urlToFetch, {headers: {Authorization: `bearer ${accessToken}`}});
        const responseJson = await response.json();
        if (responseJson.subreddits.length === 0) {
            return;
        } 
        let subreddits = responseJson.subreddits.map(sr => {
            let obj = {
                id: sr.id, 
                name: sr.name,
                icon: sr.icon,
                numSubscribers: sr.numSubscribers
            }
            return obj;
        })
        return subreddits;
    },
    async getArticles(data) {
        const accessToken = Reddit.getAccessToken();
        let urlToFetch;
        if (data.sub) {
         urlToFetch = 'https://oauth.reddit.com/r/' + data.sub + '/' + data.type + '?limit=20';
        } else {
        urlToFetch = 'https://oauth.reddit.com/' + data.type + '?limit=20';
        }
        const response = await fetch (urlToFetch, {headers: {Authorization: `bearer ${accessToken}`}});
        const responseJson = await response.json();
        console.log(responseJson);
        let articles = responseJson.data.children.map(ar => {
            let obj = {
                id: ar.data.id,
                url: ar.data.url,
                score: ar.data.score,
                title: ar.data.title,
                selftext: ar.data.selftext,
                media: ar.data.media_embed,
                thumbnail: ar.data.thumbnail,
                comments: ar.data.num_comments
            }
            return obj;
        })
        return articles;
    },
    async getComments(id) {
        const accessToken = Reddit.getAccessToken();
        const urlToFetch = 'https://oauth.reddit.com/comments/' + id + '?limit=50';
        const response = await fetch (urlToFetch, {headers: {Authorization: `bearer ${accessToken}`}});
        const responseJson = await response.json();
        console.log(responseJson);
        let comments = responseJson[1].data.children.map(com => {
            let obj = {
             id: com.data.id,
             author: com.data.author,
             body: com.data.body,
             score: com.data.score,
             replies: com.data.replies? com.data.replies.data.children : []
            }
            return obj;
        })
        return comments;
    },
    getAccessToken() {
        if (auth) {
            return auth;
        }
        const authMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (authMatch && expiresInMatch) {
            auth = authMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => auth = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return auth;
        } else {
            window.location.href = 'https://www.reddit.com/api/v1/authorize?client_id=' + clientID + '&response_type=token&state=' + state + '&redirect_uri=' + redirectURI + '&scope=read&';
        }
    }
}

export default Reddit;