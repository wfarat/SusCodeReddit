import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectArticles } from "./articlesSlice";
import Comments from "../comments/Comments";
export default function Article() {
    const params = useParams();
    const articles = useSelector(selectArticles);
    const ar = articles[params.article];
    let embed;
    if (ar.media.content) {
     embed = ar.media.content.replace(/&lt;/g,'<').replace(/&gt;/g,'>').slice(0,-8);
     embed = `${embed}</iframe>`;
    }   
    return (                                
<div className="article-container">
<h2>{ar.title}</h2>
{embed? <div className="video" dangerouslySetInnerHTML={{__html: embed}}></div> :
<img src={ar.url} alt=""/> }
<p>{ar.selftext}</p>
<p>{ar.score}</p>
<Comments id={ar.id} />
</div>
    )
}