import React from 'react';

const WriteButton = ({onWritePost}) => {
  return (
    <div className="write-button">
      <button
        className="teal ui button"
        onClick={onWritePost}>공유하기</button>
    </div>
  );
};

export default WriteButton;