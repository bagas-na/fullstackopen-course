/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CountriesList, CountryDetail } from "./components/Country";
import { Weather } from "./components/Weather";

const Result = ({ countries }) => {
  if (countries.length === 0) {
    return <p>No matches, specify another filter.</p>;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (countries.length > 1) {
    return CountriesList({ countries });
  }

  if (countries.length === 1) {
    return (
      <>
      <CountryDetail country={countries[0]} />
      <Weather cityName={countries[0].capital} countryCode={countries[0].ccn3} />
      </>
    )
  }
};

const App = () => {
  const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(allUrl)
      .then((result) => {
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
      <Result countries={filteredCountries} />
    </div>
  );
};

export default App;
