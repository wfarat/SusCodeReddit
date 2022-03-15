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
        <h1 className="main-header">Reddit App</h1>
        <nav>
          <ul>
            <li className='nav'><Link to="r">Subreddits</Link></li>
            <li className='nav'><Link to="hot">Hot</Link></li>
            <li className='nav'><Link to="new">New</Link></li>
            <li className='nav'><Link to="top">Top</Link></li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
