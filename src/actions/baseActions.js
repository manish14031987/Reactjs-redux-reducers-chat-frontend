import * as types from "./actionsTypes";
import toasterStatusAction from "./toasterStatusAction";
export function loadLanguageSuccess(selectedLang) {
  return { type: types.LOADED_LANG_SELECTED_SUCCESS, selectedLang };
}

export const setLanguage = (params) => async (dispatch) => {
  try {
    dispatch(loadLanguageSuccess(params));
  } catch (error) {
    throw error;
  }
};
export const loadToasterData = (title, error, show) => async (dispatch) => {
  try {
    dispatch(
      toasterStatusAction({
        open: show,
        message: title,
        severity: error,
      })
    );
  } catch (error) {
    throw error;
  }
};

export const loadToasterClose = (toaster) => async (dispatch) => {
  try {
    dispatch(
      toasterStatusAction({
        open: false,
        message: toaster.message,
        severity: toaster.severity,
      })
    );
  } catch (error) {
    throw error;
  }
};

export function loadLoginPopupSuccess(loginPopup) {
  return { type: types.LOADED_LOGIN_POPUP, loginPopup };
}

export const loadLoginPop = (params) => async (dispatch) => {
  try {
    dispatch(loadLoginPopupSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadRegisterPopupSuccess(registerPopup) {
  return { type: types.LOADED_REGISTER_POPUP, registerPopup };
}

export const loadRegisterPop = (params) => async (dispatch) => {
  try {
    dispatch(loadRegisterPopupSuccess(params));
  } catch (error) {
    throw error;
  }
};
export function loadForgetPopupSuccess(forgotPassPopup) {
  return { type: types.LOADED_FORGET_POPUP, forgotPassPopup };
}

export const loadForgetPop = (params) => async (dispatch) => {
  try {
    dispatch(loadForgetPopupSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadChangePasswordPopupSuccess(changePassPopup) {
  return { type: types.LOADED_CHANGE_PASSWORD_POPUP, changePassPopup };
}

export const loadChangePasswordPop = (params) => async (dispatch) => {
  try {
    dispatch(loadChangePasswordPopupSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadManageAddressdPopupSuccess(manageAddressPopup) {
  return { type: types.LOADED_MANAGE_ADDRESS_POPUP, manageAddressPopup };
}

export const loadManageAddressdPop = (params) => async (dispatch) => {
  try {
    dispatch(loadManageAddressdPopupSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadPopSuccess(resetPass) {
  return { type: types.LOADED_USER_RESET_PASS, resetPass };
}

export const loadFormPop = (params) => async (dispatch) => {
  try {
    dispatch(loadPopSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadRegisterVerifySuccess(registerVerify) {
  return { type: types.LOADED_REGISTER_VERIFY, registerVerify };
}

export const loadRegisterVerify = (params) => async (dispatch) => {
  try {
    dispatch(loadRegisterVerifySuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadDialogSuccess(dialog) {
  return { type: types.LOADED_DIALOG_INFO_SUCCESS, dialog };
}

export const loadDialog = (action) => async (dispatch) => {
  try {
    dispatch(loadDialogSuccess(action));
  } catch (error) {
    throw error;
  }
};

export const getIpAddress = (params) => async (dispatch) => {
  try {
    dispatch(loadLanguageSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadDeviceTokenSuccess(device_token) {
  return { type: types.LOADED_DEVICE_TOKEN_SUCCESS, device_token };
}

export const loadDeviceToken = (params) => async (dispatch) => {
  try {
    dispatch(loadDeviceTokenSuccess(params));
  } catch (error) {
    throw error;
  }
};
