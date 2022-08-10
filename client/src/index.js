import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
// import { fetchProducts } from "./features/users/productsSlice";
import store from "./store";

// store.dispatch(fetchProducts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
