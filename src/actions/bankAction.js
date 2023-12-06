import { agent } from "../utils/agent";
import * as types from "./actionsTypes";
import * as API from "../utils/apiPath";
import toasterStatusAction from "./toasterStatusAction";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";
import submittingRequestStatus from "./submittingRequestStatusAction";

import { loadToasterData } from "./baseActions";

export function getBankData(bankData) {
  return { type: types.LOAD_BANK_DATA_SUCCESS, bankData };
}

export function getCardData(cardData) {
  return { type: types.LOAD_CARD_DATA_SUCCESS, cardData };
}

export const fetchBankData = () => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.LOAD_BANK_DATA);
    dispatch(getBankData(response.data.data));
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

export const fetchCardData = () => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.LOAD_CARD);
    dispatch(getCardData(response.data.data));
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

export const addCard = (params, push) => async (dispatch) => {
  try {
    var pageType = localStorage.getItem("pageTypeSet");
    var productId = localStorage.getItem("productId");

    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.post(API.LOAD_CARD, params);
    dispatch(getCardData(response.data.data));
    dispatch(toggleNetworkRequestStatus(false));
    localStorage.removeItem("pageTypeSet");
    localStorage.removeItem("productId");
    if (pageType === "manage") {
      push(`/manage`);
    } else if (pageType === "buy-now") {
      push(`/product-review/${productId}`);
    } else {
      push(`/payment-method`);
    }

    dispatch(loadToasterData(response.data.message, "success", true));
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
//LOAD_CARD
export const deleteCard = (params, push) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    console.log("params", params);
    const response = await agent.delete(API.LOAD_CARD, {
      data: params,
    });
    dispatch(getCardData(response.data.data));
    dispatch(toggleNetworkRequestStatus(false));
    push(`/payment-method`);
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

export const saveUpdateBankData = (params) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.LOAD_BANK_DATA, params);
    dispatch(submittingRequestStatus(false));

    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};
