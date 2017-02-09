import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

class UploadImage extends Component {

  state = {
    preview: '',
    filename: ''
  }

  onDrop = (files) => {
    this.setState({
      preview: files[0].preview,
      filename: files[0].name
    });
  }

  handleRemove = () => {
    this.setState({
      preview: '',
      filename: ''
    });
  }

  render() {
    const {preview, filename} = this.state;

    const image = (
      <div className="preview">
        <img className="ui flid image" src={preview} alt="" />
        <i
          className="circular teal remove inverted icon"
          onClick={this.handleRemove}>
        </i>
      </div>
    );

    return (
      <div className="upload-image">
        {preview ? image :
          <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false}>
            <div>사진을 올려주세요</div>
          </Dropzone>
        }
      </div>
    );
  }
}

export default UploadImage;