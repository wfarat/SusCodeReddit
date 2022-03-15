import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {setupServer} from 'msw/node'
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subreddits  from './features/subreddits/Subreddits';
import Subreddit from './features/subreddits/Subreddit';
import Articles from './features/articles/Articles';
import Article from './features/articles/Article';

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

// ...

test('handlers server error', async () => {

  // ...
})


test('renders main menu and header, checks if search button renders', async () => {
  const { getByText } = render(
    <Provider store={store}>
    <Router>
          <Routes>
            <Route path="/" element={<App />}>
            <Route path="r" element={<Subreddits />} />
              <Route path="/r/:sub" element={<Subreddit />} />
              <Route path="/r/:sub/:article" element={<Article />}/>
              <Route path="hot" element={<Articles type="hot"/>}/>         
              <Route path="new" element={<Articles type="new" />}/>
              <Route path="top" element={<Articles type="top" />}/>
              <Route path="/hot/:article" element={<Article />}/>
              <Route path="/new/:article" element={<Article />}/>
              <Route path="/top/:article" element={<Article />}/>
            </Route>
        </Routes>
        </Router>
    </Provider>
  );

  expect(getByText(/Hot/i)).toBeInTheDocument();
  expect(getByText(/Subreddits/i)).toBeInTheDocument();
  expect(getByText(/Reddit App/i)).toBeInTheDocument();
  expect(getByText(/New/i)).toBeInTheDocument();
  expect(getByText(/Top/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText('Subreddits'))

  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(getByText(/Search for subreddits/i)).toBeInTheDocument();
});


