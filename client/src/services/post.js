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