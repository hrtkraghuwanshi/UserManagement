import combineReducers from "redux";
import { reducer } from "./components/redux/reducer";
export const rootreducer = combineReducers({
  reducer: reducer,
});
