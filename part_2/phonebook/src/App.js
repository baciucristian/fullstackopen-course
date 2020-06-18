import React, {useState} from 'react';
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
    const filteredPersons = persons.filter(person =>
      person.name.includes(event.target.value.trim()),
    );
    setSelectedPersons(filteredPersons);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <div>
        Filter shown with: <input onChange={handleFilterChange} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Persons persons={selectedPersons} />
    </>
  );
};

export default App;
