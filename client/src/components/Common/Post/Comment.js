import React from 'react';

const Comment = ({data}) => {
  console.log('data: ', data);

  return (
    <div className="comment">
      <span className="username">{data.accountId.common_profile.username}</span> &nbsp;
      <span className="content">{data.comment}</span>
    </div>
  );
};

export default Comment;