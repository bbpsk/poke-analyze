import { createStore  } from "redux";
import reducers from "./reducers/combine";

const initialState = {}
const store = createStore(reducers, initialState);

export default store