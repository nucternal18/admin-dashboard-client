import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";
import { api } from "./api";

const reducers = {
  [api.reducerPath]: api.reducer,
  global: globalReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<any, AnyAction> = (
  state,
  action: AnyAction
) => combinedReducer(state, action);

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // Add your middleware here. For example, you can add
      // a Redux Thunk middleware to handle async logic:
      // thunkMiddleware,
      // For other middleware, see https://redux-toolkit.js.org/api/getDefaultMiddleware
      api.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
