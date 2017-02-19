import React from 'react';

import image from 'assets/sample-image.jpg';

const PreviewList = ({data}) => {

  const previewList = data.map(
    item => (
      <div
        key={item._id}
        className="column">
        <img className="ui image" src={item.image} alt="" />
      </div>
    )
  );

  return (
    <div className="preview-list">
      <div className="ui grid">

        <div className="column row">
          {previewList}
        </div>

      </div>
    </div>
  );
};

export default PreviewList;