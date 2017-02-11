import React from 'react';

import UserInfo from './UserInfo';
import Image from './Image';
import Icons from './Icons';
import Description from './Description';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

const Post = ({session, data}) => {
  console.log('post data: ', data);

  return (
    <div className="post">
      <UserInfo
        session={session}
        writer={data.writer}
        follow={data.follow}
      />
      <Image
        image={data.post.image}
      />
      <Icons
        session={session}
        like={data.post.likes}
        commentCount={data.comment_count}
      />
      <Description
        description={data.post.description}
        date={data.post.date}
      />
      <CommentList />
      <CommentInput />
    </div>
  );
};

export default Post;
