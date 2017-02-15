import React from 'react';

const CommentInput = ({onWriteComment}) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onWriteComment(e.target.value);
      e.target.value = '';
    }
  }

  return (
    <div className="comment-input">
      <div className="ui fluid input">
        <input
          type="text" placeholder="댓글 달기..."
          onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
};

export default CommentInput;