import { SET_CART_ITEMS, TOGGLE_CART } from "./ActionType";

const INITIAL_STATE = {
  showCart: false,
  cartItems: [],
};

export const rootReducer = (state = INITIAL_STATE, action) => {
  if (action.type === TOGGLE_CART) {
    return {
      ...state,
      showCart: action.payload,
    };
  } else if (action.type === SET_CART_ITEMS) {
    return {
      ...state,
      cartItems: action.payload,
    };
  } else {
    return {
      ...state,
    };
  }
};
