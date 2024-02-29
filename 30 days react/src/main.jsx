import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//  import { Provider } from "mobx-react";
//  import { todoStore } from "./store/mobx/store.js";
//  import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider todoStore={todoStore}> */}
    {/* <RecoilRoot> */}
      <App />
    {/* </RecoilRoot> */}
    {/* </Provider> */}
  </React.StrictMode>
);
