import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: null, number: null, id: 0 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const filteredPersons =
    filter.length > 0
      ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
      : persons;

  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberChangeHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const exist = persons.find((person) => person.name === newName);
    if (exist !== undefined) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChangeHandler={filterChangeHandler} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        nameChangeHandler={nameChangeHandler}
        newNumber={newNumber}
        numberChangeHandler={numberChangeHandler}
        submitHandler={submitHandler}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
