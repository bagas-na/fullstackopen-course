/* eslint-disable react/prop-types */
const Persons = ({ filteredPersons, deletePersonHandler }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          <p style={{ display: "inline" }}>
            {person.name} {person.number} {"   "}
          </p>
          <button type="button" onClick={() => deletePersonHandler(person.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
