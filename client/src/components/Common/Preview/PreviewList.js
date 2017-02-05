import React from 'react';

const PreviewList = () => {
  return (
    <div className="preview-list">
      <div className="ui grid">

        <div className="three column row">
          <div className="column">
            <img className="ui image" src="http://semantic-ui.com/images/wireframe/image.png" />
          </div>
          <div className="column">
            <img className="ui image" src="http://semantic-ui.com/images/wireframe/image.png" />
          </div>
          <div className="column">
            <img className="ui image" src="http://semantic-ui.com/images/wireframe/image.png" />
          </div>
        </div>

        <div className="three column row">
          <div className="column">
            <img className="ui image" src="http://semantic-ui.com/images/wireframe/image.png" />
          </div>
          <div className="column">
            <img className="ui image" src="http://semantic-ui.com/images/wireframe/image.png" />
          </div>
          <div className="column">
            <img className="ui image" src="http://semantic-ui.com/images/wireframe/image.png" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PreviewList;