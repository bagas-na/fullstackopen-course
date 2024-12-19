/* eslint-disable react/prop-types */
const PersonForm = ({newName, nameChangeHandler, newNumber, numberChangeHandler, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input name="name" type="text" value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input name="number" type="text" value={newNumber} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
