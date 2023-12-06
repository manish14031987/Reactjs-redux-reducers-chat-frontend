import * as types from "./actionsTypes";
import submittingRequestStatus from "./submittingRequestStatusAction";
import * as API from "../utils/apiPath";
import { agent } from "../utils/agent";
import { loadToasterData } from "./baseActions";
import { toast } from "react-toastify";

export function loadNotificationDataSuccess(notificationData) {
  return { type: types.LOADED_NOTIFICATION_DATA_SUCCESS, notificationData };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export const loadData = () => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.get(API.NOTIFICATION_DATA);
    dispatch(loadNotificationDataSuccess(response.data.data.item));
    dispatch(submittingRequestStatus(false));
  } catch (error) {
    dispatch({
      type: loadToasterData,
    });
    toast.error(error.message);
    dispatch(submittingRequestStatus(false));
  }
};
