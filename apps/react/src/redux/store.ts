import { createStore, Action, applyMiddleware, combineReducers } from 'redux';

import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import { roleReducer } from './roles';
import { appMapReducer } from './map.redux';

const rootReducer = combineReducers({
  appMapReducer,
  roleReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<T> = ThunkAction<T, RootState, unknown, Action<string>>;
export type AppDispatch = ThunkDispatch<RootState, undefined, Action<string>>;
