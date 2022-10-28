import { createStore } from "redux";
import { cardReducer } from "./cardReducer";
import { cartReducer } from "./cartReducer";

const rootReducer = (state = {}, action = {}) => {
  return {
    card: cardReducer(state.card, action),
    cart: cartReducer(state.cart, action),
  };
};

export function initStore() {
  const store = createStore(rootReducer);
  return store;
}
