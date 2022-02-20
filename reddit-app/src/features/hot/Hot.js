import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHot, selectHot } from "./hotSlice";
import "./hot.css";
export default function Hot() {
    const hot = useSelector(selectHot);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadHot());
    }, []);
    return (
        <section className="hot-section">
            <ul className="hot-list">
                {hot.map(ar => {
                    return (
                        <li key={ar.id} className="hot">
                            <div className="hot-container">
                                <h2>{ar.title}</h2>
                                <img src={ar.url} alt=""/>
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