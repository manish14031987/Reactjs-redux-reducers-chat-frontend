const initialState = {
  userProfileData: [],
  sidebarLoader: false,
  aboutDoffo: "",
  aboutLoading: false,
  doffoVerifyLoader: false,
  publicProfileData: {},
  publicProfileLoading: false,
  changeImageLoading: false,
  changeBannerImageLoader: false,
  archivePostList: [],
  archivePostPagination: {},
  archivePostLoading: false,
  emailNotificationCheck: false,
  pushNotificationCheck: false,
  buyingAndSellingList: [],
  buyingAndSellingPagination: {},
  buyingAndSellingLoading: false,
  orderTrackingData: {},
  favoriteAndRecommendList: [],
  favoriteAndRecommendPagination: {},
  favoriteAndRecommendLoading: false,
};

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_PROFILE_DATA":
      return {
        ...state,
        userProfileData: action.payload,
      };

    case "SIDEBAR_LOADER":
      return {
        ...state,
        sidebarLoader: action.payload,
      };

    case "ABOUT_DOFFO":
      return {
        ...state,
        aboutDoffo: action.payload,
      };
    case "ABOUT_DOFFO_LOADING":
      return {
        ...state,
        aboutLoading: action.payload,
      };

    case "DOFFO_VERIFY_LOADING":
      return {
        ...state,
        doffoVerifyLoader: action.payload,
      };

    //Public Profile

    case "PUBLIC_PROFILE_DATA":
      return {
        ...state,
        publicProfileData: action.payload,
      };

    case "PUBLIC_PROFILE_LOADING":
      return {
        ...state,
        publicProfileLoading: action.payload,
      };

    case "CHANGE_IMAGE_LOADER":
      return {
        ...state,
        changeImageLoading: action.payload,
      };

    case "CHANGE_BANNER_IMAGE_LOADER":
      return {
        ...state,
        changeBannerImageLoader: action.payload,
      };

    case "ARCHIVE_LIST":
      return {
        ...state,
        archivePostList: action.payload,
      };

    case "ARCHIVE_LIST_PAGINATION":
      return {
        ...state,
        archivePostPagination: action.payload,
      };

    case "ARCHIVE_LIST_LOADING":
      return {
        ...state,
        archivePostLoading: action.payload,
      };

    // Email Notification

    case "IS_EMAIL_CHECK":
      return {
        ...state,
        emailNotificationCheck: action.payload,
      };

    // Push Notification

    case "IS_PUSH_CHECK":
      return {
        ...state,
        pushNotificationCheck: action.payload,
      };

    //***************Purchase and Sale History********************/
    case "BUYING_AND_SELLING_LIST":
      return {
        ...state,
        buyingAndSellingList: action.payload,
      };

    case "BUYING_AND_SELLING_PAGINATION":
      return {
        ...state,
        buyingAndSellingPagination: action.payload,
      };

    case "BUYING_AND_SELLING_LOADING":
      return {
        ...state,
        buyingAndSellingLoading: action.payload,
      };

    case "ORDER_TRACKING_LIST":
      return {
        ...state,
        orderTrackingData: action.payload,
      };

    //******************LIKES************************/
    case "FAVORITE_AND_RECOMMENDED_LIST":
      return {
        ...state,
        favoriteAndRecommendList: action.payload,
      };

    case "FAVORITE_AND_RECOMMENDED_PAGINATION":
      return {
        ...state,
        favoriteAndRecommendPagination: action.payload,
      };

    case "FAVORITE_AND_RECOMMENDED_LOADING":
      return {
        ...state,
        favoriteAndRecommendLoading: action.payload,
      };

    default:
      return state;
  }
};

export default SidebarReducer;
