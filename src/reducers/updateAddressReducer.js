import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function updateUserAddress(
  state = initialState.updateuseradd,
  action
) {
  switch (action.type) {
    case types.UPDATE_USER_ADDRESS:
      return action.updateuseradd;
    default:
      return state;
  }
}
