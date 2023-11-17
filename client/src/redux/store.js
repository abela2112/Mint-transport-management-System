import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "../redux/features/user";
import usersReducer from "../redux/features/userlist";
import responseReducer from "../redux/features/response";
import requestReducer from "../redux/features/request";
// const store = configureStore({
//   name: 'user',
//   reducer: userReducer,
// });

// export default store;

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  user: userReducer,
  response: responseReducer,
  request: requestReducer,
  users: usersReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
