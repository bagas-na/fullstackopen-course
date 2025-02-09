import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter(state, action) {
      const filter = action.payload
      return filter
    }
  }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer