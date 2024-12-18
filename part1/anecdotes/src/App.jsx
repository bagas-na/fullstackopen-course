import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const len = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(len).fill(0));

  let maxVotes = 0;
  let maxVotesIndex = 0;
  for (let i = 0; i < len; i++) {
    if (votes[i] > maxVotes) {
      maxVotes = votes[i];
      maxVotesIndex = i;
    }
  }

  const nextAnecdoteHandler = () => {
    let index = 0;

    while (index === selected) {
      index = Math.floor(Math.random() * len) % len;
    }

    setSelected(index);
  };

  const voteHandler = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;

    setVotes(newVotes);
  };

  return (
    <>
    <div>
      <h1>Anectdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>
        has {votes[selected]} vote{votes[selected] > 1 ? "s" : ""}
      </p>
      <button onClick={() => voteHandler(selected)}>vote</button>
      <button onClick={() => nextAnecdoteHandler()}>Next Anecdote</button>
    </div>
    <div>
      <h1>Anecdotes with most votes</h1>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>
        has {votes[maxVotesIndex]} vote{votes[maxVotesIndex] > 1 ? "s" : ""}
      </p>
    </div>
    </>
  );
};

export default App;
