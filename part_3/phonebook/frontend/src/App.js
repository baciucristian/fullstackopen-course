import React, {useState, useEffect} from 'react';

import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchedWord, setSearchedWord] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationColor, setNotificationColor] = useState('');

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleDeleteClick = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteData(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setNotificationColor('green');
        setNotificationMessage(`${name} was deleted`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const hasSameName = persons.some(person => person.name === newName);

    if (hasSameName) {
      const confirmMessage = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );
      const personWithSameName = persons.find(
        person => person.name === newName,
      );

      if (confirmMessage) {
        personService
          .update(personWithSameName.id, personObject)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.name === personWithSameName.name
                  ? returnedPerson
                  : person,
              ),
            );
            setNotificationColor('green');
            setNotificationMessage(`Updated ${personObject.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch(error => {
            console.log(error.response.data);
            setNotificationColor('red');
            setNotificationMessage(String(error.response.data.error));
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(
              persons.filter(person => person.id !== personWithSameName.id),
            );
          });
      }
    } else
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNotificationColor('green');
          setNotificationMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          console.log(error.response.data);
          setNotificationColor('red');
          setNotificationMessage(String(error.response.data.error));
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
  };

  const handleNameChange = event => {
    setNewName(event.target.value.trim());
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value.trim());
  };

  const handleFilterChange = event => {
    const inputWord = event.target.value.trim().toLowerCase();
    setSearchedWord(inputWord);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} color={notificationColor} />
      <Filter handleChange={handleFilterChange} />

      <h2>Add a new</h2>
      <Form
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchedWord={searchedWord}
        handleDeleteClick={handleDeleteClick}
      />
    </>
  );
};

export default App;
