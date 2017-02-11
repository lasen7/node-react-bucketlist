import React from 'react';

import image from 'assets/sample-image.jpg';

const PreviewList = () => {
  return (
    <div className="preview-list">
      <div className="ui grid">

        <div className="column row">
          <div className="column">
            <img className="ui image" src={image} alt="" />
          </div>
          <div className="column">
            <img className="ui image" src={image} alt="" />
          </div>
          <div className="column">
            <img className="ui image" src={image} alt="" />
          </div>
          <div className="column">
            <img className="ui image" src={image} alt="" />
          </div>
          <div className="column">
            <img className="ui image" src={image} alt="" />
          </div>
          <div className="column">
            <img className="ui image" src={image} alt="" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PreviewList;