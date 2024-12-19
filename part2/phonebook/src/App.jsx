import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
