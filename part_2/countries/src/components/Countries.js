import React from 'react';
import Country from './Country';
import CountryName from './CountryName';

const Countries = ({countries}) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return (
      <ul>
        {countries.map(country => (
          <CountryName key={country.alpha2Code} country={country} />
        ))}
      </ul>
    );
  }
};

export default Countries;
