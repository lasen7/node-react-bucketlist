import React from 'react';
import { Checkbox } from 'semantic-ui-react'

const CheckItem = ({data}) => {
  return (
    <div className="check-item">
      <Checkbox
        label={data.title} />
    </div>
  );
};

export default CheckItem;