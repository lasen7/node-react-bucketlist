import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

class UploadImage extends Component {

  onDrop = (files) => {
    const {onUpload} = this.props;

    onUpload(files[0]);
  }

  handleRemove = () => {
    const {onRemove} = this.props;

    // this.setState({
    //   preview: ''
    // });

    onRemove();
  }

  render() {
    const { preview } = this.props;

    const imageView = (
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
        {preview ? imageView :
          <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false}>
            <div>사진을 올려주세요</div>
          </Dropzone>
        }
      </div>
    );
  }
}

UploadImage.propTypes = {
  preview: React.PropTypes.string,
  onUpload: React.PropTypes.func,
  onRemove: React.PropTypes.func,
}

export default UploadImage;