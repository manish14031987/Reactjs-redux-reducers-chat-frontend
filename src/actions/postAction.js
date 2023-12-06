import * as types from "./actionsTypes";
import submittingRequestStatus from "./submittingRequestStatusAction";
import * as API from "../utils/apiPath";
import { agent } from "../utils/agent";
import toasterStatusAction from "./toasterStatusAction";
import { loadToasterData } from "./baseActions";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";

export function createPostSuccess(createpost) {
  return { type: types.CREATE_POST, createpost };
}
export function getCategorySuccess(getCategoriesData) {
  return { type: types.GET_CATEGORY, getCategoriesData };
}
export function getBrandSuccess(getBrandData) {
  return { type: types.GET_BRAND, getBrandData };
}
export function getModalSuccess(getModalData) {
  return { type: types.GET_MODAL, getModalData };
}
export function onPostSubmitSuccess(submitPost) {
  return { type: types.SUBMIT_POST, submitPost };
}
export function onGetConditionSuccess(getConditionData) {
  return { type: types.GET_CONDITION, getConditionData };
}
export function getAddressListSuccess(getAddressListData) {
  return { type: types.GET_ADDRESS_LIST, getAddressListData };
}
export function postPreviewSuccess(postPreview) {
  return { type: types.POST_PREVIEW, postPreview };
}
var createPostId;
// add manage address
export function createPost(
  params,
  formData,
  showPreview,
  callback,
  history,
  handleShowDialog,
  togglePostSucessModal,
  postId,
  pageType
) {
  return async (dispatch) => {
    dispatch(toggleNetworkRequestStatus(true));
    await agent
      .post(API.CREATE_POST_URL, params)
      .then((response) => {
        createPostId = response.data.data._id;
        dispatch(toggleNetworkRequestStatus(false));
        dispatch(createPostSuccess(params));
        if (response.status === 200) {
          if (showPreview) {
            dispatch(
              postPreview({ id: createPostId }, callback, handleShowDialog)
            );
          } else {
            if (pageType === "sell") {
              dispatch(onSubmitPost(formData, history, togglePostSucessModal));
            } else {
              if (postId) {
                dispatch(onUpdatePost(formData, history, pageType));
              } else {
                dispatch(
                  onSubmitPost(formData, history, togglePostSucessModal)
                );
              }
            }
          }
        }
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
        dispatch(toggleNetworkRequestStatus(false));
      });
  };
}

export function postPreview(params, callback, handleShowDialog) {
  return async (dispatch) => {
    dispatch(submittingRequestStatus(true));
    await agent
      .post(API.POST_PREVIEW_URL, params)
      .then((response) => {
        if (response.status === 200) {
          handleShowDialog();
          dispatch(submittingRequestStatus(false));
          dispatch(postPreviewSuccess(params));
          callback(response.data.data);
        }
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
        dispatch(submittingRequestStatus(false));
      });
  };
}

export function onSubmitPost(params, history, togglePostSucessModal) {
  params.append("_id", createPostId);
  return async (dispatch) => {
    dispatch(submittingRequestStatus(true));
    await agent
      .post(API.ON_POST_SUBMIT, params)
      .then((response) => {
        dispatch(
          toasterStatusAction({ open: true, message: response.data.message })
        );
        dispatch(submittingRequestStatus(false));
        dispatch(onPostSubmitSuccess(params));
        if (response.status === 200) {
          togglePostSucessModal();
        }
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
        dispatch(submittingRequestStatus(false));
      });
  };
}

export const getPostCategory = () => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.GET_CATEGORY_URL);

    dispatch(getCategorySuccess(response.data.data));
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

export const getBrand = (id) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(`${API.GET_BRAND_URL}?category_id=${id}`);
    dispatch(getBrandSuccess(response.data.data));
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

export const getModal = (id) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(`${API.GET_MODAL_URL}?brand_id=${id}`);
    dispatch(getModalSuccess(response.data.data));
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

export const onGetCondition = () => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.ON_GET_CONDITION);
    dispatch(onGetConditionSuccess(response.data.data));
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

export const getAddressList = () => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.GET_ADDRESS_LIST_URL);

    dispatch(getAddressListSuccess(response.data.data));
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

export function onUpdatePost(params, history, pageType) {
  return async (dispatch) => {
    dispatch(submittingRequestStatus(true));
    await agent
      .post(API.ON_UPDATE_POST, params)
      .then((response) => {
        dispatch(
          toasterStatusAction({ open: true, message: response.data.message })
        );
        dispatch(submittingRequestStatus(false));
        // dispatch(onPostSubmitSuccess(params));
        if (response.status === 200) {
          // togglePostSucessModal();
          if (pageType == "manage") {
            history.push("/manage");
          } else {
            history.push("/manage-post-list");
          }
        }
        // console.log("RESPONSE OF UPDATE POST", response.data);
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
        dispatch(submittingRequestStatus(false));
      });
  };
}
export const getPostDetails = (request, returnData) => async (dispatch) => {
  try {
    console.log("Data", request);
    dispatch(submittingRequestStatus(true));
    const response = await agent.get(API.SELL_ANOTHER + "?id=" + request.id);
    dispatch(submittingRequestStatus(false));
    //console.log("response.data.data",response.data.data)
    returnData(response.data.data);
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};
