import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function setDefaultUserAddress(
  state = initialState.defaultuseradd,
  action
) {
  switch (action.type) {
    case types.DEFAULT_USER_ADDRESS:
      return action.defaultuseradd;
    default:
      return state;
  }
}
