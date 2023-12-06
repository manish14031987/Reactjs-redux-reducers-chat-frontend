import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function selectedLangRequest(
  state = initialState.selectedLang,
  action
) {
  switch (action.type) {
    case types.LOADED_LANG_SELECTED_SUCCESS:
      return action.selectedLang;
    default:
      return state;
  }
}
