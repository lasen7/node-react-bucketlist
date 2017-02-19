import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';
import * as bookmark from 'redux/modules/bookmark';

import { PageTitle, PreviewList } from 'components';

class Bookmark extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  async componentDidMount() {
    const {BookmarkActions} = this.props;

    try {
      await this.checkSession();

      const session = this.props.status.auth.getIn(['session']).toJS();
      await BookmarkActions.getBookmark(session.common_profile.username);
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
    const bookmark = this.props.status.bookmark.getIn(['bookmark']).toJS();

    return (
      <div>
        <PageTitle title="북마크" />
        <PreviewList data={bookmark} />
      </div>
    );
  }
}

Bookmark = connect(
  state => ({
    status: {
      auth: state.auth,
      bookmark: state.bookmark
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch),
    BookmarkActions: bindActionCreators(bookmark, dispatch)
  })
)(Bookmark);

export default Bookmark;