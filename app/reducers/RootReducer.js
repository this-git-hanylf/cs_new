import { combineReducers } from "redux";

import user from "./UserReducer";

import status from "./StatusReducer";
import AuthReducer from "./auth";
import ApplicationReducer from "./application";

const rootReducer = combineReducers({
  user,
  status,

  auth: AuthReducer,
  application: ApplicationReducer,
});

export default rootReducer;
