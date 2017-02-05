import React from 'react';

import Comment from './Comment';

const CommentList = () => {
  return (
    <div className="comment-list">
      <span className="open-comment">댓글 10개 모두 보기</span>
      <Comment />
      <div className="ui divider">
      </div>
    </div>
  );
};

export default CommentList;