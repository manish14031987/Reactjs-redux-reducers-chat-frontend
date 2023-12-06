import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function resetPass(state = initialState.resetPass, action) {
  switch (action.type) {
    case types.LOADED_USER_RESET_PASS:
      return action.resetPass;
    default:
      return state;
  }
}
