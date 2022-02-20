import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Subreddits  from './features/subreddits/Subreddits';
import Subreddit from './features/subreddits/Subreddit';
import Articles from './features/articles/Articles';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="r" element={<Subreddits />} />
              <Route path="/r/:sub" element={<Subreddit />} />
              <Route path="hot" element={<Articles type="hot"/>}/>
              <Route path="new" element={<Articles type="new" />}/>
            </Route>
        </Routes>
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
