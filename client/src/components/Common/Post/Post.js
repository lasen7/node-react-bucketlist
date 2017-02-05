import React from 'react';

import UserInfo from './UserInfo';
import Image from './Image';

const Post = () => {
  return (
    <div className="post">
      <UserInfo />
      <Image />
    </div>
  );
};

export default Post;