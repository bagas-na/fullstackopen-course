import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(newAnecdote));

    dispatch(setNotification(`You added "${newAnecdote}"`));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 5000);
  };
  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" placeholder="write a new anecdote here" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
export default AnecdoteForm;
