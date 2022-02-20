import { useSelector } from "react-redux";
import { selectSubreddits } from "./subredditsSlice";
import Search from "../../compontents/search/Search";

export default function Subreddits() {
    const subreddits = useSelector(selectSubreddits);
    const img = "https://www.redditstatic.com/avatars/avatar_default_17_DDBD37.png";
    return (
        <section className="subreddits">
            <Search />
            <ul className="subreddits-list">
                {subreddits.map(sub => {
                    return (
                        <li key={sub.id} className="subreddit">
                            <div className="subreddits-container">
                                <img src={sub.icon ? sub.icon : img} alt=""/>
                                <h2>{sub.name}</h2>
                                <p>Users subscribed: {sub.numSubscribers}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}