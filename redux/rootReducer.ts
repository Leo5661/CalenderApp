import { combineReducers } from '@reduxjs/toolkit'
import { monthSlice } from './slices/MonthSlice'
import { tagsSlice } from './slices/TagSlice'

export const rootReducer = combineReducers({
  monthSlice: monthSlice.reducer,
  tagSlice: tagsSlice.reducer,
})

//type
export type RootState = ReturnType<typeof rootReducer>
