let initialState = {
  addresses: [],
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_ADDRESSES":
      return {
        ...state,
        addresses: action.payload,
      };

    default:
      return state;
  }
};
