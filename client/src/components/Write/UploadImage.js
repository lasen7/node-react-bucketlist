import React from 'react';

import image from 'assets/sample-image.jpg';

const UploadImage = () => {
  const empty = (
    <div className="empty-image">
      <i className="image icon"></i>
    </div>
  );

  return (
    <div className="upload-image">
      <img className="ui flid image" src={image} alt="" />
      {/*{empty}*/}
    </div>
  );
};

export default UploadImage;