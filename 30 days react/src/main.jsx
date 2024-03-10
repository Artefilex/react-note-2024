import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//  import { Provider } from "mobx-react";
//  import { todoStore } from "./store/mobx/store.js";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { RecoilRoot } from "recoil";
import { productsApi } from "./featuers/apiCallsRtk.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider todoStore={todoStore}> */}
    <RecoilRoot>
      <Provider store={store}>


      {/* <ApiProvider api={productsApi}> */}
        <App />
      {/* </ApiProvider> */}
      </Provider>
    </RecoilRoot>
    {/* </Provider> */}
  </React.StrictMode>
);
