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
      <div className="add-item" onClick={this.toggleWrite}>Add an item...</div>
    );

    return (
      <div className="">
        {this.state.isWrite ? <WriteItem onCancel={this.toggleWrite} /> : addItem}
      </div>
    );
  }
}

export default componentName;