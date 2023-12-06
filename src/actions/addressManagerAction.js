import * as types from "./actionsTypes";
import submittingRequestStatus from "./submittingRequestStatusAction";
import * as API from "../utils/apiPath";
import { agent } from "../utils/agent";
import toasterStatusAction from "./toasterStatusAction";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";
import {
    loadToasterData,
} from "./baseActions";

export function addUserAddressSuccess(addUserAddress) {
    return { type: types.ADD_USER_ADDRESS, addUserAddress };
}

export function getUserAddressSuccess(getuserdata) {
    return { type: types.GET_USER_ADDRESS, getuserdata };
}
export function updatedUserAddressSuccess(updateuseradd) {
    return { type: types.UPDATE_USER_ADDRESS, updateuseradd };
}
export function deleteUserAddressSuccess(deleteuseradd) {
    return { type: types.DELETE_USER_ADDRESS, deleteuseradd };
}
export function defaultUserAddressSuccess(defaultuseradd) {
    return { type: types.DEFAULT_USER_ADDRESS, defaultuseradd };
}

// get manage addess
export const fetchUserAddressData = () => async (dispatch) => {
    try {
        dispatch(toggleNetworkRequestStatus(true));
        const response = await agent.get(API.USER_ADDRESS_URL);
        dispatch(getUserAddressSuccess(response.data.data));
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
// add manage address
export function addUserAddress(params) {
    return async (dispatch) => {
        dispatch(submittingRequestStatus(true));
        await agent
            .post(API.USER_ADDRESS_URL, params)
            .then((response) => {
                dispatch(
                    toasterStatusAction({ open: true, message: response.data.message })
                );
                dispatch(submittingRequestStatus(false));
                dispatch(addUserAddressSuccess(params));
            })
            .catch((error) => {
                dispatch(loadToasterData(error.message, "error", true));
                dispatch(submittingRequestStatus(false));
            });
    };
}
// update manage address
export function updateUserAddress(params, id) {
    params["id"] = id;
    return async (dispatch) => {
        dispatch(submittingRequestStatus(true));
        await agent
            .put(API.USER_ADDRESS_URL, params)
            .then((response) => {
                dispatch(
                    toasterStatusAction({ open: true, message: response.data.message })
                );
                dispatch(submittingRequestStatus(false));
                dispatch(updatedUserAddressSuccess(params));
                dispatch(getUserAddressSuccess(response.data.data));
            })
            .catch((error) => {
                dispatch(loadToasterData(error.message, "error", true));
                dispatch(submittingRequestStatus(false));
            });
    };
}


// delete manage addess
export function deleteUserAddress(params) {
    return async (dispatch) => {
        dispatch(submittingRequestStatus(true));
        await agent
            .delete(API.USER_ADDRESS_URL, { data: params })
            .then((response) => {
                dispatch(
                    toasterStatusAction({ open: true, message: response.data.message })
                );
                dispatch(submittingRequestStatus(false));
                dispatch(deleteUserAddressSuccess(params));
                dispatch(getUserAddressSuccess(response.data.data));
            })
            .catch((error) => {
                dispatch(loadToasterData(error.message, "error", true));
                dispatch(submittingRequestStatus(false));
            });
    };
}
// set default manage addess
export function setDefaultUserAddress(params) {
    return async (dispatch) => {
        dispatch(submittingRequestStatus(true));
        await agent
            .patch(API.USER_ADDRESS_URL, params)
            .then((response) => {
                dispatch(
                    toasterStatusAction({ open: true, message: response.data.message })
                );
                dispatch(submittingRequestStatus(false));
                dispatch(defaultUserAddressSuccess(params));
                dispatch(getUserAddressSuccess(response.data.data));
            })
            .catch((error) => {
                dispatch(loadToasterData(error.message, "error", true));
                dispatch(submittingRequestStatus(false));
            });
    };
}