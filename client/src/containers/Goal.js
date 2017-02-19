import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';
import * as goal from 'redux/modules/goal';

import { GoalWrapper } from 'components';

class Goal extends Component {

  async componentDidMount() {
    try {
      await this.checkSession();
      await this.getGoal();
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

  getGoal = async () => {
    const {GoalActions} = this.props;
    const session = this.props.status.auth.getIn(['session']).toJS();
    await GoalActions.getGoal(session.common_profile.username);
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
      auth: state.auth,
      goal: state.goal
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch),
    GoalActions: bindActionCreators(goal, dispatch)
  })
)(Goal);

export default Goal;