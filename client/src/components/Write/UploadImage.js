import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

class UploadImage extends Component {

  state = {
    preview: ''
  }

  onDrop = (files) => {
    const {onUpload} = this.props;

    this.setState({
      preview: files[0].preview
    });

    onUpload(files[0]);
  }

  handleRemove = () => {
    const {onRemove} = this.props;

    this.setState({
      preview: ''
    });

    onRemove();
  }

  render() {
    const {preview} = this.state;

    const image = (
      <div className="preview">
        <img className="ui flid image" src={preview} alt="" />
        <i
          className="circular remove icon"
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

UploadImage.propTypes = {
  onUpload: React.PropTypes.func,
  onRemove: React.PropTypes.func,
}

export default UploadImage;