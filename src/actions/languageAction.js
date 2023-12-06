import { agent } from "../utils/agent";
import * as types from "./actionsTypes";
import * as API from "../utils/apiPath";
import submittingRequestStatus from "./submittingRequestStatusAction";
import { loadToasterData } from "./baseActions";
import toasterStatusAction from "./toasterStatusAction";

export function updateLanguage(language) {
  return { type: types.UPDATE_LANGUAGE, language };
}
export function changeLanguage(params, push) {
  return async function (dispatch) {
    dispatch(submittingRequestStatus(true));
    await agent
      .post(API.UPDATE_LANGUGAGE_URL, params)
      .then((response) => {
        dispatch(submittingRequestStatus(false));
        dispatch(
          updateLanguage()
        );
        dispatch(toasterStatusAction({ open: true, message: response.data.message }))
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
        dispatch(submittingRequestStatus(false));
      });
  };
}


