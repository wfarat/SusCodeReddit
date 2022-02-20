import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadArticles, selectArticles, selectStatus } from "./articlesSlice";
export default function Articles(props) {
    const newAr = useSelector(selectArticles);
    const status = useSelector(selectStatus);
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
            {status === "pending" && <p>Loading...</p>}
            <ul className="articles-list">
                {Object.values(newAr).map(ar => {
                    return (
                        <Link to={ar.id} key={ar.id}>
                        <li key={ar.id} className="article">
                        <h3>{ar.title}</h3>
                        <img src={ar.thumbnail} alt="" />
                        <p>Upvotes: {ar.score}</p>
                        <p>Comments: {ar.comments}</p>
                        </li>
                        </Link>
                    )
                })}
            </ul>
        </section>
    )
}