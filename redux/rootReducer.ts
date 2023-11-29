import { combineReducers } from '@reduxjs/toolkit'
import { monthSlice } from './slices/MonthSlice'
import { tagsSlice } from './slices/TagSlice'
import { eventSlice } from './slices/eventSlice'

export const rootReducer = combineReducers({
  monthSlice: monthSlice.reducer,
  tagSlice: tagsSlice.reducer,
  eventSlice: eventSlice.reducer,
})

//type
export type RootState = ReturnType<typeof rootReducer>
