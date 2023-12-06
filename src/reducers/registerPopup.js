import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function registerPopup(
  state = initialState.registerPopup,
  action
) {
  switch (action.type) {
    case types.LOADED_REGISTER_POPUP:
      return action.registerPopup;
    default:
      return state;
  }
}
