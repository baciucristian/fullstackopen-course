import React, {useState} from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    {name: 'Dan Abramov', number: '12-43-234345'},
    {name: 'Mary Poppendieck', number: '39-23-6423122'},
  ]);

  const [selectedPersons, setSelectedPersons] = useState(persons);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const hasSameName = persons.some(person => person.name === newName);

    if (hasSameName) alert(`${newName} is already added to phonebook!`);
    else {
      setPersons(persons.concat(personObject));
      setSelectedPersons(persons.concat(personObject));
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
