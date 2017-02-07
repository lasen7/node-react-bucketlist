import React, { Component } from 'react';

import WriteItem from './WriteItem';

class componentName extends Component {

  state = {
    isWrite: false
  }

  toggleWrite = () => {
    this.setState({
      isWrite: !this.state.isWrite
    });
  }

  render() {
    const addItem = (
      <div onClick={this.toggleWrite}>Add an item...</div>
    );

    return (
      <div className="add-item">
        {this.state.isWrite ? <WriteItem onCancel={this.toggleWrite} /> : addItem}
      </div>
    );
  }
}

export default componentName;