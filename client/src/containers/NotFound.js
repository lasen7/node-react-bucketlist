import React from 'react';

const NotFound = () => {
  const style = {
    'marginTop': '5rem',
    'marginLeft': '3rem'
  }

  return (
    <div style={style}>
      <h3>404 Not Found</h3>
      <h4>요청하신 페이지를 찾을 수 없습니다.</h4>
    </div>
  );
};

export default NotFound;