import React from 'react';

import UserInfo from './UserInfo';
import Image from './Image';
import Icons from './Icons';
import Description from './Description';

const Post = () => {
  return (
    <div className="post">
      <UserInfo />
      <Image />
      <Icons />
      <Description />
    </div>
  );
};

export default Post;