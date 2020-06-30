import React from 'react';
import Person from './Person';

const Persons = ({persons, handleDeleteClick}) => {
  return (
    <ul>
      {persons.map(person => (
        <Person
          key={person.id}
          person={person}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </ul>
  );
};

export default Persons;
