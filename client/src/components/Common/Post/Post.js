import React, { Component } from 'react';

import UserInfo from './UserInfo';
import Image from './Image';
import Icons from './Icons';
import Description from './Description';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

class Post extends Component {
  handleDeletePost = async () => {
    const {PostActions, data} = this.props;

    try {
      await PostActions.deletePost(data._id);
    } catch (e) {
    }
  }

  render() {
    const {session, data} = this.props;

    console.log('post data: ', data);

    return (
      <div className="post">
        <UserInfo
          onDeletePost={this.handleDeletePost}
          session={session}
          writer={data.writer}
          follow={data.follow}
        />
        <Image
          image={data.post.image}
        />
        <Icons
          session={session}
          like={data.post.likes}
          commentCount={data.comment_count}
        />
        <Description
          description={data.post.description}
          date={data.post.date}
        />
        <CommentList />
        <CommentInput />
      </div>
    );
  }
}

Post.propTypes = {
  PostActions: React.PropTypes.object,
  session: React.PropTypes.object,
  data: React.PropTypes.object
};

export default Post;