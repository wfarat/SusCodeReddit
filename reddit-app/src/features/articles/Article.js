import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectArticles } from "./articlesSlice";
import Comments from "../comments/Comments";
export default function Article() {
    const params = useParams();
    const articles = useSelector(selectArticles);
    const ar = articles[params.article];
    let embed;
    let video;
    if (ar.media) {
    if (ar.media.reddit_video) {
        video = ar.media.reddit_video.fallback_url
    } else if (ar.media.type === "youtube.com") {
        embed = ar.media.oembed.html.replace(/&lt;/g,'<').replace(/&gt;/g,'>').slice(0,-8);
        embed = `${embed}</iframe>`;
    }  
}
    return (                                
<div className="article-container">
<h2>{ar.title}</h2>
{embed && <div className="video" dangerouslySetInnerHTML={{__html: embed}}></div> }
{video && <video preload="auto" controls><source src={video} type="video/mp4" /></video>}
<img src={ar.url} alt=""/> 
<p>{ar.selftext}</p>
<p className="upvotes">Upvotes: {ar.score}</p>
<h2>Comments:</h2>
<Comments id={ar.id} />
</div>
    )
}

