import React, {useState, useEffect} from 'react';

import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
      setSelectedPersons(initialPersons);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const hasSameName = persons.some(person => person.name === newName);

    if (hasSameName) alert(`${newName} is already added to phonebook!`);
    else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setSelectedPersons(persons.concat(returnedPerson));
      });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value.trim());
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value.trim());
  };

  const handleFilterChange = event => {
    const searchedPerson = event.target.value.trim().toLowerCase();
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(searchedPerson),
    );
    setSelectedPersons(filteredPersons);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Filter handleChange={handleFilterChange} />

      <h2>Add a new</h2>
      <Form
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={selectedPersons} />
    </>
  );
};

export default App;
