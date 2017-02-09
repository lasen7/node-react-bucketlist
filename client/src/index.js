import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store from './redux/store';

import { App, NotFound, Auth, Feed, Hashtag, Profile, Post, Bookmark, Goal, Write, Friend, Search } from 'containers';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Feed} />
        <Route path="auth" component={Auth} />
        <Route path="auth/:signin" component={Auth} />
        <Route path="search" component={Hashtag} />
        <Route path="profile/:username" component={Profile} />
        <Route path="post/:username" component={Post} />
        <Route path="bookmark/:username" component={Bookmark} />
        <Route path="goal/:username" component={Goal} />
        <Route path="write" component={Write} />
        <Route path="friend" component={Friend} />
        <Route path="search/:hashtag" component={Search} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
