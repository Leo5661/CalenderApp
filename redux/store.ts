import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { middleware } from './middleware'

export const store = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === `development`) {
      return getDefaultMiddleware().concat(middleware)
    }
    return getDefaultMiddleware()
  },
})

//types
export type ReduxStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
