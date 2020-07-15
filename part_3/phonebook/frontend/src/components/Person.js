import React from 'react';

const Person = ({person, handleDeleteClick}) => {
  return (
    <li>
      {person.name} {`${person.number} `}
      <button
        type="button"
        onClick={() => handleDeleteClick(person.name, person.id)}
      >
        delete
      </button>
    </li>
  );
};

export default Person;
