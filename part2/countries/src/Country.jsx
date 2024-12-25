/* eslint-disable react/prop-types */
import { useState } from "react";

export const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        <p style={{ margin: "0" }}>capital: {country.capital}</p>
        <p style={{ margin: "0" }}>area: {country.area}</p>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{ boxShadow: "0px 0px 5px -4px black" }}
        />
      </div>
    </>
  );
};

export const Country = ({ country }) => {
  const [isVisible, setIsVisible] = useState(false);
  const text = isVisible ? "hide" : "show";
  return (
    <div>
      <div>
        <p style={{display: "inline"}}>{country.name.common} </p>
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
        {text}
        </button>
      </div>
      <div>
        {isVisible && <CountryDetail country={country} />}
      </div>
    </div>
  );
};

export const CountriesList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country?.ccn3}><Country country={country} /></li>
      ))}
    </ul>
  );
};
