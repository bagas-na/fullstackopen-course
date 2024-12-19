/* eslint-disable react/prop-types */
const Filter = ({filter, filterChangeHandler}) => {
  return (
    <div>
      filter shown with{" "}
      <input name="filter" type="text" value={filter} onChange={filterChangeHandler} />
    </div>
  );
};

export default Filter;
