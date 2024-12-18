import { useState } from "react";

const Button = (props) => {
  return (
    <button type="button" onClick={() => props.clickHandler()}>
      {props.label}
    </button>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <th style={{ textAlign: "left" }}>{props.label}</th>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const count = good + neutral + bad;
  const average = (good - bad) / count;
  const positive = (good / count) * 100 + "%";

  return (
    <div>
      <h1>Statistics</h1>
      {count > 0 ? (
        <table>
          <tbody>
            <StatisticLine label="Good" value={good} />
            <StatisticLine label="Neutral" value={neutral} />
            <StatisticLine label="Bad" value={bad} />
            <StatisticLine label="All" value={count} />
            <StatisticLine label="Average" value={average} />
            <StatisticLine label="Positive" value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button label="Good" clickHandler={handleClickGood} />
      <Button label="Neutral" clickHandler={handleClickNeutral} />
      <Button label="Bad" clickHandler={handleClickBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
