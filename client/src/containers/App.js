import React, { Component } from 'react';

import { Header } from 'components';

class App extends Component {
  render() {
    const { location } = this.props;
    const re = /auth/;
    const isAuth = re.test(location.pathname);

    return (
      <div>
        {isAuth ? undefined : <Header />}
        {this.props.children}
      </div>
    );
  }
}

export default App;
