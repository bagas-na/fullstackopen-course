import { useState } from "react";

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
      <div>
        filter shown with{" "}
        <input name="filter" type="text" value={filter} onChange={filterChangeHandler} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input name="name" type="text" value={newName} onChange={nameChangeHandler} />
        </div>
        <div>
          number:{" "}
          <input name="number" type="text" value={newNumber} onChange={numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
