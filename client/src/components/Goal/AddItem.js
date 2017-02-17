import React, { Component } from 'react';

import WriteItem from './WriteItem';

class AddItem extends Component {

  state = {
    isWrite: false
  }

  toggleWrite = () => {
    this.setState({
      isWrite: !this.state.isWrite
    });
  }

  handleSave = async (title) => {
    const {GoalActions} = this.props;

    try {
      await GoalActions.writeGoal(title);
      this.toggleWrite();
    } catch (e) {
    }
  }

  render() {
    const addItem = (
      <div className="add-item" onClick={this.toggleWrite}>Add an item...</div>
    );

    return (
      <div className="">
        {this.state.isWrite ? <WriteItem onSave={this.handleSave} onCancel={this.toggleWrite} /> : addItem}
      </div>
    );
  }
}

AddItem.propTypes = {
  GoalActions: React.PropTypes.object
};

export default AddItem;