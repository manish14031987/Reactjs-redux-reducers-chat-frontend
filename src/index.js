import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import storeConfig from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
const { REACT_APP_BASE_NAME } = process.env;
const { store, persistor } = storeConfig;

ReactDOM.render(
  <StrictMode>
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename={REACT_APP_BASE_NAME}>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.Fragment>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
