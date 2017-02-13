import React from 'react';

const WriteButton = ({onWritePost, onEditPost, isEditMode}) => {
  const handleClick = () => {
    if (!isEditMode) {
      onWritePost();
    } else {
      onEditPost();
    }
  }

  return (
    <div className="write-button">
      <button
        className="teal ui button"
        onClick={handleClick}>{isEditMode ? '수정하기' : '공유하기'}</button>
    </div>
  );
};

export default WriteButton;