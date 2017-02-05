import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store from './store';

import { App, NotFound, Auth, Feed, Hashtag } from 'containers';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Feed} />
        <Route path="auth" component={Auth} />
        <Route path="auth/:signin" component={Auth} />
        <Route path="search/:hashtag" component={Hashtag} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
