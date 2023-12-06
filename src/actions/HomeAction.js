import submittingRequestStatus from "./submittingRequestStatusAction";
import * as types from "./actionsTypes";
import * as API from "../utils/apiPath";
import { agent } from "../utils/agent";
import toasterStatusAction from "./toasterStatusAction";
import { loadToasterData } from "./baseActions";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";

const HOME_PRODUCT_LIST = (data) => {
  return {
    type: "HOME_PRODUCT_LIST",
    payload: data,
  };
};

const HOME_PRODUCT_LOADING = (data) => {
  return {
    type: "HOME_PRODUCT_LOADING",
    payload: data,
  };
};

const HOME_PRODUCT_LOAD_MORE_LIST = (data) => {
  return {
    type: "HOME_PRODUCT_LOAD_MORE_LIST",
    payload: data,
  };
};

const HOME_PRODUCT_LOAD_MORE_LOADING = (data) => {
  return {
    type: "HOME_PRODUCT_LOAD_MORE_LOADING",
    payload: data,
  };
};

const HOME_PRODUCT_PAGINATION = (data) => {
  return {
    type: "HOME_PRODUCT_PAGINATION",
    payload: data,
  };
};

const HOME_PRODUCT_DETAILS = (data) => {
  return {
    type: "HOME_PRODUCT_DETAILS",
    payload: data,
  };
};

const REPORT_LIST = (data) => {
  return {
    type: "REPORT_LIST",
    payload: data,
  };
};

const REPORT_LIST_LOADER = (data) => {
  return {
    type: "REPORT_LIST_LOADER",
    payload: data,
  };
};

const SUBMIT_REASON_LOADER = (data) => {
  return {
    type: "SUBMIT_REASON_LOADER",
    payload: data,
  };
};

export {
  HOME_PRODUCT_LIST,
  HOME_PRODUCT_LOADING,
  HOME_PRODUCT_LOAD_MORE_LIST,
  HOME_PRODUCT_PAGINATION,
  HOME_PRODUCT_LOAD_MORE_LOADING,
  HOME_PRODUCT_DETAILS,
  REPORT_LIST,
  REPORT_LIST_LOADER,
  SUBMIT_REASON_LOADER,
};

// **********************APIs Functions******************************
// Home Page Product List
export function fetchHomeProductList(data) {
  return async (dispatch) => {
    dispatch(HOME_PRODUCT_LOADING(true));
    await agent
      .post(API.LOAD_PRODUCT_LIST, data)
      .then((response) => {
        if (response.status === 200) {
          // console.log("RESPONSE OF HOME PRODUCT LIST", response.data.data);
          dispatch(HOME_PRODUCT_LIST(response?.data?.data?.data));
          dispatch(HOME_PRODUCT_PAGINATION(response?.data?.data?.pagination));
          dispatch(HOME_PRODUCT_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
        dispatch(HOME_PRODUCT_LOADING(false));
      });
  };
}

// Home Page Product List
export function fetchHomeProductOnLoadMore(data) {
  return async (dispatch) => {
    dispatch(HOME_PRODUCT_LOAD_MORE_LOADING(true));
    await agent
      .post(API.LOAD_PRODUCT_LIST, data)
      .then((response) => {
        if (response.status === 200) {
          // console.log("RESPONSE OF HOME PRODUCT LIST--->", response.data.data);
          dispatch(HOME_PRODUCT_LOAD_MORE_LIST(response?.data?.data?.data));
          dispatch(HOME_PRODUCT_PAGINATION(response?.data?.data?.pagination));
          dispatch(HOME_PRODUCT_LOAD_MORE_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
        dispatch(HOME_PRODUCT_LOAD_MORE_LOADING(false));
      });
  };
}

//Get Product Details
export function getHomeProductDetail(data, setCurrentImg, setProductLocation) {
  data.city = "";
  var userCity = localStorage.getItem("userCity");
  if (userCity) {
    data.city = userCity;
  }
  return async (dispatch) => {
    await agent
      .post(API.FETCH_PRODUCT_DETAILS, data)
      .then((response) => {
        if (response.status === 200) {
          setCurrentImg(response?.data?.data?.image[0]?.url);
          setProductLocation(response?.data?.data?.location);
          dispatch(HOME_PRODUCT_DETAILS(response?.data?.data));
        }
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
      });
  };
}

//Get Product Details
export function geProductDetail(data) {
  data.city = "";
  var userCity = localStorage.getItem("userCity");
  if (userCity) {
    data.city = userCity;
  }
  return async (dispatch) => {
    await agent
      .post(API.FETCH_PRODUCT_DETAILS, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(HOME_PRODUCT_DETAILS(response?.data?.data));
        }
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
      });
  };
}

// handel Add/Remove Favorite
export function addRemoveFavoriteProductDetails(
  jsonData,
  data,
  setCurrentImg,
  setProductLocation
) {
  return async (dispatch) => {
    await agent
      .post(API.FAVORITE_ADD_REMOVE, jsonData)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            toasterStatusAction({ open: true, message: response.data.message })
          );
          dispatch(
            getHomeProductDetail(data, setCurrentImg, setProductLocation)
          );
        }
      })
      .catch((error) => {
        dispatch(loadToasterData(error.message, "error", true));
      });
  };
}

//Report List
export const getReportList = () => async (dispatch) => {
  try {
    dispatch(REPORT_LIST_LOADER(true));
    const response = await agent.get(API.GET_REPORT_LIST);
    if (response.status === 200) {
      // console.log("RESPONSE OF REPORT LIST---->", response.data.data);
      dispatch(REPORT_LIST(response?.data?.data));
      dispatch(REPORT_LIST_LOADER(false));
    }
  } catch (error) {
    dispatch(REPORT_LIST_LOADER(false));
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
  }
};

// Submit Report
export const submitReport = (data) => async (dispatch) => {
  // return async (dispatch) => {
  try {
    dispatch(SUBMIT_REASON_LOADER(true));
    const response = await agent.post(API.SUBMIT_REPORT, data);

    if (response.status === 200) {
      dispatch(
        toasterStatusAction({ open: true, message: response.data.message })
      );
      dispatch(SUBMIT_REASON_LOADER(false));

      // onHide();
    }
  } catch (error) {
    dispatch(SUBMIT_REASON_LOADER(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};

// Subscribe in Footer
export function Subscribe(data) {
  return async (dispatch) => {
    alert(data + " This module coming soon!");
    // dispatch(SUBMIT_REASON_LOADER(true));
    // await agent
    //   .post(API.SUBSCRIBE, data)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       dispatch(
    //         toasterStatusAction({ open: true, message: response.data.message })
    //       );
    //       dispatch(SUBMIT_REASON_LOADER(false));
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(SUBMIT_REASON_LOADER(false));
    //     dispatch(loadToasterData(error.message, "error", true));
    //   });
  };
}
export const loadBuyNowDetails = (request, returnData) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.BUY_NOW, request);
    dispatch(submittingRequestStatus(false));
    //console.log("response.data.data",response.data.data)
    returnData(response.data.data.data);
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const loadOrderData =
  (request, paymentData, returnData) => async (dispatch) => {
    try {
      dispatch(loadAuthorizePayData(paymentData));
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.ORDER_PAYMENT, request);
      dispatch(submittingRequestStatus(false));
      //console.log("response.data.data",response.data.data)
      returnData(response.data.data.data);
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };

export const productReview = (request, returnData) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.put(API.PRODUCT_REVIEW, request);
    dispatch(submittingRequestStatus(false));
    //console.log("response.data.data",response.data.data)
    returnData(response.data.data);
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const purchaseDetailsSave =
  (request, returnOrderId) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.PURCHASE_PRODUCT, request);
      dispatch(submittingRequestStatus(false));
      //console.log("response.data.data",response.data.data)
      if (response.status === 200) {
        localStorage.removeItem("post_id");
        localStorage.removeItem("addressID");
        localStorage.removeItem("coupon");
        localStorage.removeItem("amount");
        localStorage.removeItem("card_token");

        /*   dispatch(
          toasterStatusAction({ open: true, message: response.data.message })
        );*/
        returnOrderId(response.data.data);
      }
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };

/* Coupon Code */
export const loadCouponData =
  (request, returnCouponData) => async (dispatch) => {
    try {
      const response = await agent.put(API.COUPON_VERIFY, request);
      dispatch(submittingRequestStatus(false));
      if (response.status === 200) {
        returnCouponData(response.data.data);
      }
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
/* Coupon Code */

/* Address List */
export const getAddressList =
  (request, returnDataAddress) => async (dispatch) => {
    try {
      const response = await agent.get(API.GET_ADDRESS_LIST_URL, request);
      dispatch(submittingRequestStatus(false));
      if (response.status === 200) {
        returnDataAddress(response.data.data);
      }
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
/* Address List */

/* Is Default */

export const setDefaultAddress = (params) => async (dispatch) => {
  try {
    await agent.patch(API.USER_ADDRESS_URL, params);
    dispatch(submittingRequestStatus(false));
    // dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};
/* Is Default */
export const ContactSeller =
  (request, contactSellerChat) => async (dispatch) => {
    try {
      dispatch(toggleNetworkRequestStatus(true));
      const response = await agent.post(API.CONTACT_SELLER, request);
      if (response.status === 200) {
        contactSellerChat(response.data.data);
      }
      dispatch(toggleNetworkRequestStatus(false));
    } catch (error) {
      dispatch(toggleNetworkRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
/* Filter category */
export const getCategoryList =
  (request, returnCategory) => async (dispatch) => {
    try {
      const response = await agent.get(API.FILTER_CATEGORY, request);
      dispatch(submittingRequestStatus(false));
      if (response.status === 200) {
        returnCategory(response.data.data);
      }
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
/* Filter category */

/* Subscription */
export const subscriptionItem = (request, returnData) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.SUBSCRIPTION_BUY, request);
    dispatch(submittingRequestStatus(false));
    //console.log("response.data.data",response.data.data)
    returnData(response.data.data.data);
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};
export const subscriptionDetailsSave = (request) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(
      API.SUBSCRIPTION_PLAN_BUY_CONFIRM,
      request
    );
    dispatch(submittingRequestStatus(false));
    //console.log("response.data.data",response.data.data)
    if (response.status === 200) {
      localStorage.removeItem("boost_id");
      localStorage.subscription_amount("pageTypeSet");
      localStorage.removeItem("card_token");
      dispatch(loadToasterData(response.data.message, "success", true));
      /*  dispatch(
          toasterStatusAction({ open: true, message: response.data.message })
        );*/
      //returnSubscription(response.data.data);
    }
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};
/* Subscription */

/* AuthoRize Payment */

export function loadAuthorizePayData(paymentData) {
  return { type: types.PAYMENT_DATA_REDUCER, paymentData };
}

export const authorizePaymentDetails =
  (request, paymentData, returnData) => async (dispatch) => {
    try {
      dispatch(loadAuthorizePayData(paymentData));
      dispatch(toggleNetworkRequestStatus(true));
      const response = await agent.post(API.AUTHORIZE_PAYMENT, request);
      returnData(response.data.data.data);
    } catch (error) {
      dispatch(toggleNetworkRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
export const getReturnRequestData =
  (request, returnDataRequest) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.VIEW_RETURN_REQUEST, request);
      dispatch(submittingRequestStatus(false));
      returnDataRequest(response.data.data);
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
export const getPostDataOffer =
  (request, returnDataOffer) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.VIEW_POST_DATA, request);
      dispatch(submittingRequestStatus(false));
      returnDataOffer(response.data.data);
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
export const getWalletBalance =
  (request, returnDataWallet) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.get(API.GET_PROFILE_BALANCE, request);
      dispatch(submittingRequestStatus(false));
      returnDataWallet(response.data.data);
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
