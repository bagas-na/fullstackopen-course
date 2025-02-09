import { useDispatch } from 'react-redux';
import anecdoteService from '../../services/anecdoteService';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote));

    dispatch(setNotification(`You added "${newAnecdote.content}"`));
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
