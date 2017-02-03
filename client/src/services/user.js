import request from 'utils/request';

export const getUsers = () => {
  return request({
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'get'
  });
};