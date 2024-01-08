import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import AuthenticationModule from "./authentication-module/AuthenticationModule";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthenticationModule />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
