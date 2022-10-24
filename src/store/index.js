import { createStore } from "redux";
import { cardReducer } from "./cardReducer";

const rootReducer = (state = {}, action = {}) => {
  return {
    card: cardReducer(state.card, action),
  };
};

export const store = createStore(rootReducer);
