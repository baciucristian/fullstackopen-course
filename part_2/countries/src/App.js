import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [queryCountries, setQueryCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleQueryChange = event => {
    const inputName = event.target.value.trim().toLowerCase();
    const queryCountries = countries.filter(country =>
      country.name.toLowerCase().includes(inputName),
    );
    setQueryCountries(queryCountries);
  };

  return (
    <>
      <Filter handleChange={handleQueryChange} />
      {queryCountries.length > 10 ? (
        <ErrorMessage />
      ) : (
        <Countries countries={queryCountries} />
      )}
    </>
  );
};

export default App;
