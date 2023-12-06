import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "../reducers/index";

const persistConfig = {
  key: "web",
  storage,
  whitelist: [
    "isAuth",
    "selectedLang",
    "userInfo",
    "userParams",
    "paymentData",
    "device_token",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);
const storeConfig = { store, persistor };
export default storeConfig;
