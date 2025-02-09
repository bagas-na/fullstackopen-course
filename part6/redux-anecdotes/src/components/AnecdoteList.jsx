import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import anecdoteService from '../../services/anecdoteService';
import { addVoteOfId, setAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

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
    anecdoteService.getAll().then((anecdote) => dispatch(setAnecdotes(anecdote)));
  }, []);

  const vote = async (id) => {
    const { content, votes } = anecdotesArray.find(anecdote => anecdote.id === id)
    const updatedAnecdote = await anecdoteService.update(id, { id, content, votes: votes + 1 })
    dispatch(addVoteOfId(updatedAnecdote.id));

    dispatch(setNotification(`You voted for "${content}"`));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 5000);
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
