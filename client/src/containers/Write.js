import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';
import * as post from 'redux/modules/post';

import { PageTitle, UploadImage, WriteInput, WriteButton } from 'components';

import alert from 'alertifyjs';

class Write extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    image: null,
    description: ''
  };

  componentDidMount() {
    document.body.classList.add('hide-scroll');

    this.checkSession();
  }

  componentWillUnmount() {
    document.body.classList.remove('hide-scroll');
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

  handleWritePost = async () => {
    const {image, description} = this.state;
    const {PostActions} = this.props;

    if (!image) {
      alert.error('이미지를 올려주세요');
      return;
    }

    if (!description) {
      alert.error('설명을 작성해 주세요');
      return;
    }

    try {
      const result = await PostActions.writePost(image, description);
      this.context.router.push('/');
    } catch (e) {
      alert('다시 시도해 주세요!');
    }
  }

  handleUploadImage = (image) => {
    this.setState({
      image: image
    });
  }

  handleRemoveImage = () => {
    this.setState({
      image: null
    });
  }

  handleChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    const {PostActions} = this.props;

    return (
      <div >

        <div className="write-wrapper">
          <div className="write-container">
            <PageTitle title="공유하기" />
            <UploadImage
              onUpload={this.handleUploadImage}
              onRemove={this.handleRemoveImage} />
            <WriteInput onChange={this.handleChange} />
          </div>
        </div>

        <div className="write-footer">
          <WriteButton onWritePost={this.handleWritePost} />
        </div>
      </div>
    );
  }
}

Write = connect(
  state => ({
    status: {
      auth: state.auth,
      post: state.post
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch),
    PostActions: bindActionCreators(post, dispatch)
  })
)(Write);

export default Write;