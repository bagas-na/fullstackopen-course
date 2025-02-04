import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = {
      good: 6,
      ok: 9,
      bad: 4
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...state, good: state.good + 1
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = {
      good: 6,
      ok: 9,
      bad: 4
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...state, ok: state.ok + 1
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = {
      good: 6,
      ok: 9,
      bad: 4
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...state, bad: state.bad + 1
    })
  })

  test('state is zeroed', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {
      good: 6,
      ok: 9,
      bad: 4
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      ...initialState
    })
  })
})