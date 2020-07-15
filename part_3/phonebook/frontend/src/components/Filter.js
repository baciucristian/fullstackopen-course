import React from 'react';

const Filter = ({handleChange}) => {
  return (
    <div>
      Filter shown with: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
