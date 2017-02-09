import request from 'utils/request';

export const signup = ({
  email,
  fullname,
  username,
  password,
  gender
}) => {
  const data = new FormData();
  data.append('email', email);
  data.append('fullname', fullname);
  data.append('username', username);
  data.append('password', password);
  data.append('gender', gender);

  return request({
    url: '/api/account/signup',
    method: 'post',
    data
  });
};

export const signin = ({
  username,
  password
}) => {
  const data = new FormData();
  data.append('username', username);
  data.append('password', password);

  return request({
    url: '/api/account/signin',
    method: 'post',
    data
  });
};

export const getInfo = () => {
  return request({
    url: '/api/account/getinfo',
    method: 'get'
  });
};