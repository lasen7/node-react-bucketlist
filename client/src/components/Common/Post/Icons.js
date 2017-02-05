import React from 'react';

const Icons = () => {
  return (
    <div className="icons">

      <div className="heart-wrapper">
        <i className="heart outline large icon"></i><span className="icon-count">1</span>
      </div>

      <div className="comment-wrapper">
        <i className="comment outline large icon"></i><span className="icon-count">0</span>
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