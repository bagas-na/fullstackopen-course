import { useDispatch, useSelector } from 'react-redux';
import { addVoteOfId } from '../reducers/anecdoteReducer';
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

  const vote = (id, content) => {
    dispatch(addVoteOfId(id));

    dispatch(setNotification(`You voted for "${content}"`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  };

  const style = {
    marginBottom: 6,
  };

  return anecdotesArray.map((anecdote) => (
    <div style={style} key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
