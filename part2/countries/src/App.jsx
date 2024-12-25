/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const CountryData = ({ countries }) => {
  if (countries.length === 0) {
    return <p>No matches, specify another filter.</p>;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country?.ccn3}>{country.name.common}</li>
        ))}
      </ul>
    );
  }

  if (countries.length === 1) {
    const languages = Object.values(countries[0].languages);
    return (
      <>
        <h1>{countries[0].name.common}</h1>
        <div>
          <p style={{ margin: "0" }}>capital: {countries[0].capital}</p>
          <p style={{ margin: "0" }}>area: {countries[0].area}</p>
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
            src={countries[0].flags.png}
            alt={`Flag of ${countries[0].name.common}`}
            style={{ boxShadow: "0px 0px 5px -4px black" }}
          />
        </div>
      </>
    );
  }
};

const App = () => {
  const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(allUrl)
      .then((result) => {
        console.log(result);
        return result.json();
      })
      .then((json) => {
        setCountries(json);
      })
      .catch((e) => console.error("Failed to fetch data", e));
  }, []);

  const searchQueryHandler = (e) => {
    setQuery(e.target.value);
  };

  const filteredCountries =
    query.length === 0
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      <div>
        find countries <input type="text" value={query} onChange={searchQueryHandler} autoFocus />
      </div>
      <CountryData countries={filteredCountries} />
    </div>
  );
};

export default App;
