import {
  deleteAddressApi,
  getAddressesApi,
  postAddressesApi,
  setAsDefaultAddressApi,
  updateAddressesApi,
} from "../../api/profileApis";

export const getAddressesThunk = (payload) => async (dispatch) => {
  let { callback } = payload;
  try {
    const res = await getAddressesApi();
    if (res.status >= 200 && res.status < 300) {
      // console.log("res:", res.data.data);
      dispatch({
        type: "STORE_ADDRESSES",
        payload: res.data.data,
      });
      callback("success");
    } else {
      throw res;
    }
  } catch (err) {
    console.error("err:", err);
    callback("failure");
  }
};

export const postAddressesThunk = (payload) => async (dispatch) => {
  let { callback, data } = payload;
  try {
    const res = await postAddressesApi(data);
    if (res.status >= 200 && res.status < 300) {
      // console.log("res:", res.data.data);
      callback("success");
    } else {
      throw res;
    }
  } catch (err) {
    console.error("err:", err);
    callback("failure");
  }
};

export const deleteAddressThunk = (payload) => async (dispatch) => {
  let { callback, addressId } = payload;
  try {
    const res = await deleteAddressApi(addressId);
    if (res.status >= 200 && res.status < 300) {
      // console.log("res:", res.data.data);
      callback("success");
    } else {
      throw res;
    }
  } catch (err) {
    console.error("err:", err);
    callback("failure");
  }
};

export const setAsDefaultAddressThunk = (payload) => async (dispatch) => {
  let { callback, addressId } = payload;
  try {
    const res = await setAsDefaultAddressApi(addressId);
    if (res.status >= 200 && res.status < 300) {
      // console.log("res:", res.data.data);
      callback("success");
    } else {
      throw res;
    }
  } catch (err) {
    console.error("err:", err);
    callback("failure");
  }
};

export const updateAddressesThunk = (payload) => async (dispatch) => {
  let { callback, data } = payload;
  try {
    const res = await updateAddressesApi(data);
    if (res.status >= 200 && res.status < 300) {
      // console.log("res:", res.data.data);
      callback("success");
    } else {
      throw res;
    }
  } catch (err) {
    console.error("err:", err);
    callback("failure");
  }
};
