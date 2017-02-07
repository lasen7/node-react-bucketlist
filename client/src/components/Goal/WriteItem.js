import React from 'react';

const WriteItem = ({onCancel}) => {
  return (
    <div className="write-item animated fadeIn">
      <div className="ui input">
        <input type="text" placeholder="Add an item..." />
        <button className="ui teal button">Save</button>
        <button className="ui button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default WriteItem;