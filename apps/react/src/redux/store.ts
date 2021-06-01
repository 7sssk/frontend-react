import { createStore, Action, applyMiddleware, combineReducers } from 'redux'

import thunk, { ThunkAction } from 'redux-thunk'
import logger from 'redux-logger'
import { applyReducer } from './apply'

const rootReducer = combineReducers({
  applyReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
