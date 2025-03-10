import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotesArray = useSelector(({ anecdotes, filter }) => {
    if (filter.length > 0) {
      return [...anecdotes]
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes);
    } else {
      return [...anecdotes].sort((a, b) => b.votes - a.votes);
    }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, []);

  const vote = async (id) => {
    dispatch(voteAnecdote(id))
  };

  const style = {
    marginBottom: 6,
  };

  return anecdotesArray.map((anecdote) => (
    <div style={style} key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}{' '}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
