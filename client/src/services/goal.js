import request from 'utils/request';

export const writeGoal = ({
  title
}) => {
  const data = new FormData();
  data.append('title', title);

  return request({
    url: '/api/goal',
    method: 'post',
    data
  });
};
