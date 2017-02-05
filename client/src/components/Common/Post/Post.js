import React from 'react';

import UserInfo from './UserInfo';
import Image from './Image';
import Icons from './Icons';

const Post = () => {
  return (
    <div className="post">
      <UserInfo />
      <Image />
      <Icons />
    </div>
  );
};

export default Post;