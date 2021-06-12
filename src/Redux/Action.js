import { SET_CART_ITEMS, TOGGLE_CART } from "./ActionType";

export const toggleCart = (data) => {
  return { type: TOGGLE_CART, payload: data };
};

export const setCartItems = (data) => {
  return { type: SET_CART_ITEMS, payload: data };
};
