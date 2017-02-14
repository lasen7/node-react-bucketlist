import request from 'utils/request';

export const writePost = ({
  image,
  description
}) => {
  const data = new FormData();
  data.append('image', image);
  data.append('description', description);

  return request({
    url: '/api/post',
    method: 'post',
    data
  });
};

export const getPosts = ({
  qs
}) => {
  return request({
    url: '/api/post?q=' + qs,
    method: 'get'
  });
};

export const deletePost = ({
  postId
}) => {
  return request({
    url: '/api/post/' + postId,
    method: 'delete'
  });
};

export const editPost = ({
  postId,
  image,
  description
}) => {
  const data = new FormData();
  if (image) data.append('image', image);
  if (description) data.append('description', description);

  return request({
    url: '/api/post/' + postId,
    method: 'put',
    data
  });
}

export const getPost = ({
  postId
}) => {
  return request({
    url: '/api/post/' + postId,
    method: 'get'
  });
}