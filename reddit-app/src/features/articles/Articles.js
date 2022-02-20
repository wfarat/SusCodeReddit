import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadArticles, selectArticles } from "./articlesSlice";
export default function Articles(props) {
    const newAr = useSelector(selectArticles);
    const dispatch = useDispatch();
    useEffect(() => {
        let data = {
            type: props.type,
            sub: props.sub
        }
        dispatch(loadArticles(data));
    }, [dispatch, props.type, props.sub]);
    return (
        <section className="articles-section">
            <ul className="articles-list">
                {newAr.map(ar => {
                    let embed;
                    if (ar.media.content) {
                     embed = ar.media.content.replace(/&lt;/g,'<').replace(/&gt;/g,'>').slice(0,-8);
                     embed = `${embed}</iframe>`;
                    }
                    return (
                        <li key={ar.id} className="article">
                            <div className="new-container">
                                <h2>{ar.title}</h2>
                                {embed? <div class="video" dangerouslySetInnerHTML={{__html: embed}}></div> :
                                <img src={ar.url} alt=""/> }
                                <p>{ar.selftext}</p>
                                <p>{ar.score}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}