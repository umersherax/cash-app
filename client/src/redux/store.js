import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist";

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
);

export const persistor = persistStore(store);
