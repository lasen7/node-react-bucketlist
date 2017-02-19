import request from 'utils/request';

export const addBookmark = ({
  postId
}) => {

  return request({
    url: `/api/bookmark/${postId}/like`,
    method: 'post'
  });
};

export const deleteBookmark = ({
  postId
}) => {

  return request({
    url: `/api/bookmark/${postId}/like`,
    method: 'delete'
  });
};

export const getBookmark = ({
  username
}) => {

  return request({
    url: `/api/bookmark/${username}`,
    method: 'get'
  });
};