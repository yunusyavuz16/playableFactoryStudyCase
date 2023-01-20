// import { all } from 'redux-saga/effects'
import { combineReducers } from "redux";
import appAuthReducer from "../slices/appAuthSlice";

export const rootReducer = combineReducers({
  appAuth: appAuthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export function* rootSaga() {
//   yield all([auth.saga()])
// }
