import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function UpdatePushNotify(
  state = initialState.pushStatus,
  action
) {
  switch (action.type) {
    case types.UPDATE_EMAIL_NOTIFICATION:
      return {
        ...state,
        pushStatus: action.pushStatus,
      };
    default:
      return state;
  }
}
