import { agent } from "../utils/agent";
import * as types from "./actionsTypes";
import * as API from "../utils/apiPath";
import submittingRequestStatus from "./submittingRequestStatusAction";
import { loadToasterData } from "./baseActions";
import toasterStatusAction from "./toasterStatusAction";

export function sendContactUsData(contactUs) {
  return { type: types.SUBMIT_CONTACTUS_REQUEST, contactUs };
}

export function contactUsData(params, push) {
  return async function (dispatch) {
    dispatch(submittingRequestStatus(true));
    await agent
      .post(API.SUBMIT_CONTACT_REQUEST, params)
      .then((response) => {
        dispatch(submittingRequestStatus(false));
        dispatch(
          sendContactUsData()
        );
        dispatch(toasterStatusAction({ open: true, message: response.data.message }))
        console.log(response)
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
        dispatch(submittingRequestStatus(false));
      });
  };
}