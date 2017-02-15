import React from 'react';

const Icons = ({onLikePost, onUnLikePost, session, like, commentCount}) => {
  const username = session.common_profile.username;
  const isLiked = like.indexOf(username) === -1 ? false : true;

  const handleLikePost = () => {
    !isLiked ? onLikePost() : onUnLikePost();
  }

  return (
    <div className="icons">

      <div className="heart-wrapper">
        <i
          onClick={handleLikePost}
          className={`heart outline large icon ${isLiked ? 'teal' : ''}`}></i>
        <span className="icon-count">{like.length}</span>
      </div>

      <div className="comment-wrapper">
        <i className="comment outline large icon"></i>
        <span className="icon-count">{commentCount}</span>
      </div>

      <div className="bookmark-wrapper">
        <i className="bookmark outline large icon"></i>
      </div>

      <div className="ui divider">
      </div>

    </div>
  );
};

export default Icons;