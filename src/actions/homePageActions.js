import { agent } from "../utils/agent";
import * as types from "./actionsTypes";
import * as API from "../utils/apiPath";
import { loadToasterData } from "./baseActions";
import toasterStatusAction from "./toasterStatusAction";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";
import { toast } from "react-toastify";
import { userLoginData } from "./userActions";

export function loadVerifyEmailData(token, type, push) {
  return async function (dispatch) {
    await agent
      .get(`${API.EMAIL_VERIFY_MOBILE}?token=${token}&type=${type}`)
      .then((response) => {
        push("/");
        dispatch(
          toasterStatusAction({ open: true, message: response.data.message })
        );
      })
      .catch((error) => {
        push("/");
        dispatch(loadToasterData(error.message, "error", true));
        throw error;
      });
  };
}

export function loadPageDataSuccess(pageData) {
  return { type: types.LOAD_HOME_PAGE_DATA_SUCCESS, pageData };
}

export function getProductData(homePageData) {
  return { type: "STORE_PRODUCTS_DATA", homePageData };
}

export function getOfferData(offerData) {
  return { type: types.CHECK_OFFER_DATA, offerData };
}

export const fetchProductData = (data, pageNo) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.post(API.LOAD_PRODUCT_LIST, {
      ...data,
      page: pageNo,
    });

    dispatch(getProductData(response.data.data));
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

export const loadPageData = (slug) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.CMS_PAGE + slug);
    dispatch(loadPageDataSuccess(response.data.data));
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

export const addMoreProductsData = (payload, pageNo) => async (dispatch) => {
  const { callback, data } = payload;
  try {
    const response = await agent.post(API.LOAD_PRODUCT_LIST, {
      ...data,
      page: pageNo,
    });
    if (response) {
      dispatch({ type: "ADD_MORE_PRODUCTS", payload: response.data.data });
      callback("success");
    }
  } catch (error) {
    callback("failure");
  }
};

export const fetchProductDetails = (payload) => async (dispatch) => {
  const { callback, data } = payload;
  try {
    const response = await agent.post(API.FETCH_PRODUCT_DETAILS, data);
    if (response) {
      callback("success", response.data.data);
    }
  } catch (error) {
    console.log("error:", error);
  }
};

export const getUserIpAddressAsync = (payload) => async (dispatch) => {
  const { callback, data } = payload;
  try {
    const response = "response";
    if (response) {
      console.log("response:", response);
      dispatch({ type: "STORE_IP_ADDRESS", payload: "111.93.58.10" });
      data.device_token = "08b4e5f-75b4-1d81-fee4-0f4d4dee1f31";
      dispatch(userLoginData(data));
      callback("success");
    }
  } catch (error) {
    console.log("error:", error);
    callback("failure");
  }
};

export const checkCounterReview = (request) => async (dispatch) => {
  try {
    const response = await agent.post(API.COUNTER_REVIEW_OFFER, request);
    console.log(response.data.data);
  } catch (error) {
    toast.error(error.message);
  }
};

export const checkCounterReviewSeller =
  (request, showPayment) => async (dispatch) => {
    try {
      const response = await agent.post(API.COUNTER_REVIEW_OFFER, request);
      showPayment(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const checkOfferReview = (request, showPayment) => async (dispatch) => {
  try {
    const response = await agent.post(API.OFFER_VIEWS, request);
    showPayment(response.data.data);
  } catch (error) {
    toast.error(error.message);
  }
};

export const checkProductOffer =
  (params, checkOfferData) => async (dispatch) => {
    try {
      const response = await agent.post(API.CHECK_OFFER, params);
      checkOfferData(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

export const sendOffer =
  (request, updateOffer, history) => async (dispatch) => {
    try {
      var response = await agent.post(API.SEND_OFFER, request);
      dispatch(loadToasterData(response.data.message, "success", true));
      // dispatch(toasterStatusAction(response.data.message, "success", true));
      updateOffer(response.data.data);
    } catch (error) {
      history.push("/chat");
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
