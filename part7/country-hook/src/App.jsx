import axios from "axios";
import React, { useEffect, useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries";
  const fetchUrl = `${baseUrl}/api/name/${name}`;

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((response) => {
        setCountry({ ...response, found: true });
        console.log(response)
      })
      .catch((error) => {
        setCountry({ ...error.response, found: false })
        console.error(error.code, error.response.data);
      });
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  const formatPopulation = new Intl.NumberFormat(undefined, {style: 'decimal'}).format(country.data.population)

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {formatPopulation}</div>
      <img
        style={{ border: "1px solid black" }}
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name.official}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("indonesia");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
