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
    preview: '',
    description: '',
    isEditMode: false
  };

  async componentDidMount() {
    const { params, PostActions } = this.props;

    document.body.classList.add('hide-scroll');

    this.checkSession();

    if (params.postId) {
      // if param exists, edit    
      this.setState({
        isEditMode: true
      });

      try {
        await PostActions.getPost(params.postId);

        const {post} = this.props.status.post.get('postDetail');
        this.setState({
          preview: post.image,
          description: post.description
        });
      } catch (e) {
        alert.error('다시 시도해 주세요');
        this.context.router.push('/');
      }
    }
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
    const {preview, image, description} = this.state;
    const {PostActions} = this.props;

    if (!preview) {
      alert.error('이미지를 올려주세요');
      return;
    }

    if (!description) {
      alert.error('설명을 작성해 주세요');
      return;
    }

    try {
      await PostActions.writePost(image, description);
      this.context.router.push('/');
    } catch (e) {
      alert('다시 시도해 주세요!');
    }
  }

  handleEditpost = async () => {
    const {PostActions} = this.props;
    const {preview, image, description} = this.state;
    const { params } = this.props;

    if (!preview) {
      alert.error('이미지를 올려주세요');
      return;
    }

    if (!description) {
      alert.error('설명을 작성해 주세요');
      return;
    }

    try {
      await PostActions.editPost(params.postId, image, description);
      this.context.router.push('/');
    } catch (e) {
      alert('다시 시도해 주세요!');
    }
  }

  handleUploadImage = (image) => {
    this.setState({
      image: image,
      preview: image.preview
    });
  }

  handleRemoveImage = () => {
    this.setState({
      image: null,
      preview: ''
    });
  }

  handleChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    const {isEditMode, preview, description} = this.state;

    return (
      <div >

        <div className="write-wrapper">
          <div className="write-container">
            <PageTitle title="공유하기" />
            <UploadImage
              preview={preview}
              onUpload={this.handleUploadImage}
              onRemove={this.handleRemoveImage} />
            <WriteInput
              description={description}
              onChange={this.handleChange} />
          </div>
        </div>

        <div className="write-footer">
          <WriteButton
            isEditMode={isEditMode}
            onEditPost={this.handleEditpost}
            onWritePost={this.handleWritePost} />
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