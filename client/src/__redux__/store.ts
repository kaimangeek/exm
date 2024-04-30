import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReduce } from './slice/userSlice';
import { userApi } from './services/user';
import { applicationApi } from './services/application';

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [applicationApi.reducerPath]: applicationApi.reducer,
  userSlice: userReduce
});

const apiMiddleware = [
  userApi.middleware,
  applicationApi.middleware
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware)
});

setupListeners(store.dispatch);