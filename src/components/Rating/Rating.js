import React from 'react';
import './Rating.css';

import { Rate } from 'antd';

function Rating({ value, onChange }) {
  return (
    <Rate
      className="rating"
      allowHalf
      defaultValue={value}
      count={10}
      onChange={onChange}
    />
  );
}

export default Rating;
