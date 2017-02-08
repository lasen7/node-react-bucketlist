import React from 'react';
import { Checkbox } from 'semantic-ui-react'

const CheckItem = () => {
  return (
    <div className="check-item">
      <Checkbox
        label='This checkbox is read-only' />
    </div>
  );
};

export default CheckItem;