import React from 'react';
import { useEffect } from 'react';
import './reset.css';
import './App.css';
import Search from './compontents/search/Search';
import Subreddits from './features/subreddits/Subreddits';
import Reddit from './util/reddit/Reddit';
function App() {
  useEffect(() => {
    window.addEventListener('load', () => {Reddit.getAccessToken()});
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Search />
      </header>
      <main className="App-main">
        <Subreddits />
      </main>
    </div>
  );
}

export default App;
