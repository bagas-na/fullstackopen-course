import { useState } from "react";

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const average = good - bad;
  const count = good + neutral + bad;
  const positive = good / count * 100 + "%";

  return (
    <div>
      <h1>Statistics</h1>
      {count > 0 ? (
        <>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>Average: {average}</p>
          <p>Positive: {positive}</p>
        </>
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
