// import { combineReducers } from "redux";
// import AuthReducer from "./auth";
// import ApplicationReducer from "./application";

// export default combineReducers({
//   auth: AuthReducer,
//   application: ApplicationReducer,
// });

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loading", "error"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const rootStore = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const store = rootStore;

export const persist = (callback) => persistStore(rootStore, null, callback);
