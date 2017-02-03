import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserList } from 'components';

import * as userAction from 'actions/user';

class Home extends Component {

  async componentDidMount() {
    try {
      await this.props.UserActions.getUsers();
    } catch (e) {
      return;
    }
  }

  render() {
    return (
      <div>
        <UserList users={this.props.status.users} />
      </div>
    );
  }
}

Home = connect(state => {
  return {
    status: {
      users: state.user.users.data
    }
  }
}, dispatch => {
  return {
    UserActions: bindActionCreators({
      getUsers: userAction.getUsers
    }, dispatch)
  }
})(Home);

export default Home;