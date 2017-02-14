import request from 'utils/request';

export const getProfile = ({
  username
}) => {
  return request({
    url: '/api/profile/' + username,
    method: 'get'
  });
};