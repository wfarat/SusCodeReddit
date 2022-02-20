import React from 'react';
import { useEffect } from 'react';
import './reset.css';
import './App.css';
import Reddit from './util/reddit/Reddit';
import { Link, Outlet } from 'react-router-dom';
function App() {
  useEffect(() => {
    window.addEventListener('load', () => {Reddit.getAccessToken()});
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li><Link to="r">Subreddits</Link></li>
            <li><Link to="hot">Hot</Link></li>
            <li><Link to="new">New</Link></li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
