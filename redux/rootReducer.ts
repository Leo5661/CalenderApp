import { combineReducers } from '@reduxjs/toolkit'
import { monthSlice } from './slices/MonthSlice'

export const rootReducer = combineReducers({
  monthSlice: monthSlice.reducer,
})

//type
export type RootState = ReturnType<typeof rootReducer>
