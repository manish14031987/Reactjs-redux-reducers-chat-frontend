import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function UpdateEmailNotify(
  state = initialState.emailStatus,
  action
) {
  switch (action.type) {
    case types.UPDATE_EMAIL_NOTIFICATION:
      return {
        ...state,
        emailStatus: action.emailStatus,
      };
    default:
      return state;
  }
}
