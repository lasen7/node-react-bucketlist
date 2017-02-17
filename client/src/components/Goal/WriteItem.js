import React, { Component } from 'react';

import alert from 'alertifyjs';

class WriteItem extends Component {
  state = {
    title: ''
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  handleSave = () => {
    const {onSave} = this.props;
    const {title} = this.state;

    if (!title) {
      alert.error('목표를 입력해 주세요');
      return;
    }

    onSave(title);
  }

  render() {
    const {onCancel} = this.props;
    const {title} = this.state;

    return (
      <div className="write-item animated fadeIn">
        <div className="ui input">
          <input
            type="text"
            placeholder="Add an item..."
            value={title}
            onChange={this.handleChange} />
          <button className="ui teal button" onClick={this.handleSave} >Save</button>
          <button className="ui button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

WriteItem.propTypes = {
  onSave: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export default WriteItem;