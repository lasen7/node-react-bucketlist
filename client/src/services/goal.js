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

export const getGoal = ({
  username
}) => {
  return request({
    url: '/api/goal/' + username,
    method: 'get'
  });
};

export const deleteGoal = ({
  goalId,
  goalsId
}) => {
  return request({
    url: `/api/goal/${goalId}/${goalsId}`,
    method: 'delete'
  });
};