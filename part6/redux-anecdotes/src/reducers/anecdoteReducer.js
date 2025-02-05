const anecdotesAtStart = [
  {
    id: 68091,
    content: 'If it hurts, do it more often',
    votes: 0
  },
  {
    id: 11922,
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    id: 1548,
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    id: 26833,
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  {
    id: 33980,
    content: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    id: 51661,
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  }
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      // eslint-disable-next-line no-case-declarations
      const id = action.payload.id;
      return state.map(anecdote =>
        anecdote.id === id ?
          { ...anecdote, votes: anecdote.likes + 1 } : anecdote
      )
    default:
      return state
  }

}

export default reducer