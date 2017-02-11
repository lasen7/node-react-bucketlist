import React from 'react';

import TimeAgo from 'react-timeago'
import koreaStrings from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(koreaStrings);

const Description = ({description, date}) => {
  return (
    <div className="description">
      <span className="text">{description}</span>
      <TimeAgo className="date" date={date} formatter={formatter} />
    </div>
  );
};

export default Description;

