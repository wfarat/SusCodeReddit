import {v4} from 'uuid';
var auth;
const state = v4();
const clientID = "U9g_qwSTfjs9q7lQNHeNEA";
const redirectURI = "http://localhost:3000/";
const Reddit = {
    async search(term) {
        const accessToken = Reddit.getAccessToken();
        const urlToFetch = 'https:/oauth.reddit.com/api/subreddit_autocomplete?query=' + term + '&include_profiles=false';
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
    async hot(subreddit) {
        const accessToken = Reddit.getAccessToken();
        const urlToFetch = 'https:/oauth.reddit.com/r/' + subreddit + '/hot?limit=5';
        const response = await fetch (urlToFetch, {headers: {Authorization: `bearer ${accessToken}`}});
        const responseJson = await response.json();
        console.log(responseJson);
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