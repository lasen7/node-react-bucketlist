import React, { Component } from 'react';

import { PageTitle, UploadImage, WriteInput, WriteButton } from 'components';

class Write extends Component {
  componentDidMount() {
    document.body.classList.add('hide-scroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('hide-scroll');
  }

  render() {
    return (
      <div >

        <div className="write-wrapper">
          <div className="write-container">
            <PageTitle title="공유하기" />
            <UploadImage />
            <WriteInput/>
          </div>
        </div>

        <div className="write-footer">
          <WriteButton />
        </div>
      </div>
    );
  }
}

export default Write;