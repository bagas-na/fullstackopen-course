import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../../services/anecdoteService'
import { setNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVoteOfId(state, action) {
      const id = action.payload
      return state.map(anecdote =>
        anecdote.id === id ?
          { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(
        action.payload
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { addVoteOfId, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote));
    dispatch(setNotification(`You added "${newAnecdote.content}"`, 5));
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const { content, votes } = anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = await anecdoteService.update(id, { id, content, votes: votes + 1 })
    dispatch(addVoteOfId(updatedAnecdote.id))
    dispatch(setNotification(`You voted for "${updatedAnecdote.content}"`, 5));
  }
}


export default anecdoteSlice.reducer