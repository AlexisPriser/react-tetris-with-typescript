import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";
import bgImage from "./img/bg.jpg";
import { Provider } from "react-redux";
import { configureStore, createStore } from "@reduxjs/toolkit";
import { store } from "./store";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: url(${bgImage}) #000;
    background-size: cover;
    background-position: center;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
