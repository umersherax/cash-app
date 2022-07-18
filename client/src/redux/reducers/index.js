import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import authReducer from './authReducer';
import flowReducer from './flowReducer';
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist : ['flow']
};

const rootReducer = combineReducers({
  auth: authReducer,
  flow : flowReducer,
});

export default persistReducer(persistConfig, rootReducer);
