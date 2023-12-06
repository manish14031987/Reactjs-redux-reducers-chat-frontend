import { agent } from "../utils/agent";
import * as types from "./actionsTypes";
import * as API from "../utils/apiPath";
import toasterStatusAction from "./toasterStatusAction";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";
export function getFaqData(faqData) {
  return { type: types.LOAD_FAQ_DATA_SUCCESS, faqData };
}

export const fetchFaqData = () => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.LOAD_FAQ);
    dispatch(getFaqData(response.data.data));
    dispatch(toggleNetworkRequestStatus(false));
  } catch (error) {
    dispatch(toggleNetworkRequestStatus(false));
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
  }
};
