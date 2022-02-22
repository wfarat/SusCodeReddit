import { useParams } from "react-router-dom";
import { useState } from "react";
import Articles from "../articles/Articles";
export default function Subreddit() {
    let params = useParams();
    const [type, setType] = useState('hot');
    return (
        <div className="subreddit-container">
            <div className="sub-nav">
            <button onClick={()=> setType('hot')}>Hot</button>
            <button onClick={()=> setType('new')}>New</button>
            <button onClick={()=> setType('top')}>Top</button>
            </div>
            <Articles sub={params.sub} type={type} />
        </div>
    )
}