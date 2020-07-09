import React from 'react';
import Person from './Person';

const Persons = ({persons, handleDeleteClick, searchedWord}) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(searchedWord))
        .map(person => (
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
