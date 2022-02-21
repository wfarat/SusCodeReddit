import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadComments, selectStatus, selectComments } from "./commentsSlice";
import "./comments.css";
export default function Comments(props) {
    const comments = useSelector(selectComments);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadComments(props.id));
    }, [dispatch, props.id]);
    return (
        <section className="comments-section">
            {status === "pending" && <p>Loading...</p>}
            <ul className="comments-list">
                {Object.values(comments).map(com => {
                    return (
                        <li key={com.id} className="comment">
                            <div className="comment-container">
                        <h3>Author: {com.author}</h3>
                        <p>{com.body}</p>
                        <p>Upvotes: {com.score}</p>
                        </div>
                        <ul className="replies">
                        {com.replies.map(reply => {
                        if (reply.kind === "t1") {    
                        return (
                        <li key={reply.data.id} className="comment-reply">
                        <h3>Author: {reply.data.author}</h3>
                        <p>{reply.data.body}</p>
                        <p>Upvotes: {reply.data.score}</p>
                        </li> ) } else {
                            return null;
                        }
                        })}
                        </ul>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}