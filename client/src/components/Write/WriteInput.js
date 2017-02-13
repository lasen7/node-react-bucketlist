import React from 'react';

const WriteInput = ({onChange, description}) => {
  return (
    <div className="write-input">
      <form className="ui form">
        <textarea
          name="description"
          rows="4"
          value={description}
          onChange={onChange}>
        </textarea>
      </form>
    </div>
  );
};

export default WriteInput;