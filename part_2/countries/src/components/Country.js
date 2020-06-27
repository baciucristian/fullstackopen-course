import React from 'react';
import Weather from './Weather';

const Country = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <br />
      <img alt={country.name} src={country.flag} width="200px" />

      <Weather country={country} />
    </>
  );
};

export default Country;
