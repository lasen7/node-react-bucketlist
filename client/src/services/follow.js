import request from 'utils/request';

export const follow = ({
  username
}) => {
  return request({
    url: '/api/follow/' + username,
    method: 'post'
  });
};

export const unfollow = ({
  username
}) => {
  return request({
    url: '/api/follow/' + username,
    method: 'delete'
  });
};

export const getFollowee = ({
  username
}) => {
  return request({
    url: `api/follow/${username}/followee`,
    method: 'get'
  });
}