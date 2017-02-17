import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';
import * as goal from 'redux/modules/goal';

import { GoalWrapper } from 'components';

class Goal extends Component {

  async componentDidMount() {
    try {
      this.checkSession();
    } catch (e) {
    }
  }


  checkSession = async () => {
    const {AuthActions} = this.props;

    await AuthActions.getInfo();

    // check status
    const session = this.props.status.auth.getIn(['session']).toJS();
    if (!session._id) {
      this.context.router.push('/auth/signin');
    }
  }

  render() {
    return (
      <div>
        <GoalWrapper {...this.props} />
      </div>
    );
  }
}

Goal = connect(
  state => ({
    status: {
      auth: state.auth
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch),
    GoalActions: bindActionCreators(goal, dispatch)
  })
)(Goal);

export default Goal;