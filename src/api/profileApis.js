import { agent as axiosInstance } from "../utils/agent";

export const getAddressesApi = () => {
  return axiosInstance.get(`/address`);
};

export const postAddressesApi = (data) => {
  return axiosInstance.post(`/address`, data);
};

export const deleteAddressApi = (addressId) => {
  return axiosInstance.delete(`/address`, {
    data: {
      id: addressId,
    },
  });
};

export const setAsDefaultAddressApi = (addressId) => {
  return axiosInstance.patch(`/address`, { id: addressId });
};

export const updateAddressesApi = (data) => {
  return axiosInstance.put(`/address`, data);
};
