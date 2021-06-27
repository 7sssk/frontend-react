import { createStore, Action, applyMiddleware, combineReducers } from 'redux';

import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import { appMapReducer } from './map.redux';
import { sharedReducer } from './shared.redux';

const rootReducer = combineReducers({
  appMapReducer,
  sharedReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<T> = ThunkAction<T, RootState, unknown, Action<string>>;
export type AppDispatch = ThunkDispatch<RootState, undefined, Action<string>>;
