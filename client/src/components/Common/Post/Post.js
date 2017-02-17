import React, { Component } from 'react';

import UserInfo from './UserInfo';
import Image from './Image';
import Icons from './Icons';
import Description from './Description';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

class Post extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handleDeletePost = async () => {
    const {PostActions, data} = this.props;

    try {
      await PostActions.deletePost(data._id);
    } catch (e) {
    }
  }

  handleEditPost = () => {
    const {data} = this.props;

    this.context.router.push('/write/' + data._id);
  }

  handleLikePost = async () => {
    const {PostActions, data} = this.props;

    try {
      await PostActions.likePost(data._id);
    } catch (e) {
    }
  }

  handleUnlikePost = async () => {
    const {PostActions, data} = this.props;

    try {
      await PostActions.unlikePost(data._id);
    } catch (e) {
    }
  }

  handleWirteComment = async (comment) => {
    const {PostActions, data} = this.props;

    try {
      await PostActions.writeComment(data._id, comment);
    } catch (e) {
    }
  }

  handleGetComments = async () => {
    const {PostActions, data} = this.props;

    try {
      await PostActions.getComments(data._id);
    } catch (e) {
    }
  }

  handleFollow = async () => {
    const {FollowActions, data} = this.props;

    try {
      await FollowActions.follow(data.writer);
    } catch (e) {
    }
  }

  render() {
    const {session, data, followee} = this.props;
    const findFollowee = followee.find(item =>
      item.followee.common_profile.username === data.writer
    );
    let isFollow = findFollowee ? true : false;
    if (data.writer === session.common_profile.username) {
      isFollow = true;
    }

    return (
      <div className="post">
        <UserInfo
          onFollow={this.handleFollow}
          onDeletePost={this.handleDeletePost}
          onEditPost={this.handleEditPost}
          session={session}
          writer={data.writer}
          follow={isFollow}
        />
        <Image
          image={data.post.image}
        />
        <Icons
          onLikePost={this.handleLikePost}
          onUnLikePost={this.handleUnlikePost}
          session={session}
          like={data.post.likes}
          commentCount={data.comment_count}
        />
        <Description
          description={data.post.description}
          date={data.post.date}
        />
        <CommentList
          comments={data.comments || []}
          onGetComments={this.handleGetComments}
          commentCount={data.comment_count} />
        <CommentInput
          onWriteComment={this.handleWirteComment}
        />
      </div>
    );
  }
}

Post.propTypes = {
  PostActions: React.PropTypes.object,
  FollowActions: React.PropTypes.object,
  session: React.PropTypes.object,
  data: React.PropTypes.object,
  followee: React.PropTypes.array
};

export default Post;