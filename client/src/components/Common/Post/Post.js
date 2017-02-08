import React from 'react';

import UserInfo from './UserInfo';
import Image from './Image';
import Icons from './Icons';
import Description from './Description';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

const Post = () => {
  return (
    <div className="post">
      <UserInfo />
      <Image />
      <Icons />
      <Description />
      <CommentList />
      <CommentInput />
    </div>
  );
};

export default Post;
