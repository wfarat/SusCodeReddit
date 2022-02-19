import React, { useState } from "react"
import { loadSubs } from "../../features/subreddits/subredditsSlice";
import { useDispatch } from "react-redux";

export default function Search() {
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(loadSubs(term));
    }
    return (
        <div className="search">
            <h2>Search for Subreddits</h2>
        <input id="search" type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
        <button className="searchButton" onClick={handleClick}>Search</button>
        </div>
    )
}