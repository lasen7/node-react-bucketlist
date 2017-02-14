import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Header } from 'components';

class App extends Component {
  componentDidMount() {
    console.log('App componentDidMount');
  }

  render() {
    const { location, status } = this.props;
    const re = /auth/;
    const isAuth = re.test(location.pathname);

    const session = status.auth.get('session').toJS();

    return (
      <div>
        {isAuth ? undefined : <Header username={session.common_profile.username} />}
        {this.props.children}
      </div>
    );
  }
}

App = connect(
  state => ({
    status: {
      auth: state.auth
    }
  })
)(App);

export default App;
