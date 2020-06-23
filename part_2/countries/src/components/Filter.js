import React from 'react';

const Filter = ({handleChange}) => {
  return (
    <div>
      Find countries <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
