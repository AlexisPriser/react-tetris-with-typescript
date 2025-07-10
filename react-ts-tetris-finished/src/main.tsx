import React from "react";
import ReactDOM from "react-dom/client";
import styled, { createGlobalStyle } from "styled-components";
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
    overflow: hidden;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
