import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import initFacebookSDK from "./components/FacebookSDK/FacebookSDK";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
};

initFacebookSDK().then(() => {
  renderApp();
});
