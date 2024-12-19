import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const nameChangeHandler = (e) => {
    setNewName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const exist = persons.find((person) => person.name === newName);
    if (exist !== undefined) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, { name: newName }]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
