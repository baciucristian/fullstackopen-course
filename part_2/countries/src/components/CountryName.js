import React, {useState} from 'react';
import Country from './Country';

const CountryName = ({country}) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  if (show) return <Country country={country} />;
  else
    return (
      <>
        <li>
          {country.name} <button onClick={handleClick}>Show</button>
        </li>
      </>
    );
};

export default CountryName;
