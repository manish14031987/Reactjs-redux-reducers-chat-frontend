import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function registerVerify(
  state = initialState.registerVerify,
  action
) {
  switch (action.type) {
    case types.LOADED_REGISTER_VERIFY:
      return action.registerVerify;
    default:
      return state;
  }
}
