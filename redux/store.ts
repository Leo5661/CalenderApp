import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { middleware } from './middleware'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from './storage'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'cal.ai_store',
  storage,
  blacklist: ['monthSlice'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === `development`) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(thunk)
        .concat(middleware)
    }
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk)
  },
})

//types
export type ReduxStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
