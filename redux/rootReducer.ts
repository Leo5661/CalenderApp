import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({})

//type
export type RootState = ReturnType<typeof rootReducer>
