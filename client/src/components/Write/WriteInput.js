import React from 'react';

const WriteInput = ({onChange}) => {
  return (
    <div className="write-input">
      <form className="ui form">
        <textarea
          name="description"
          rows="4"
          onChange={onChange}>
        </textarea>
      </form>
    </div>
  );
};

export default WriteInput;