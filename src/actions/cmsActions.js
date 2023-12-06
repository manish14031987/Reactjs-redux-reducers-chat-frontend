import * as types from "./actionsTypes";
import submittingRequestStatus from "./submittingRequestStatusAction";
import * as API from "../utils/apiPath";
import { agent } from "../utils/agent";
import { loadToasterData } from "./baseActions";
import { toast } from "react-toastify";

export function loadPageDataSuccess(pageData) {
  return { type: types.LOADED_PAGE_DATA_SUCCESS, pageData };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.PAGE_DATA, {
      params: request,
    });
    dispatch(loadPageDataSuccess(response.data));
    dispatch(submittingRequestStatus(false));
  } catch (error) {
    dispatch(loadNotFoundDataSuccess(false));
    dispatch({
      type: loadToasterData,
    });
    toast.error(error.message);
    dispatch(submittingRequestStatus(false));
  }
};
