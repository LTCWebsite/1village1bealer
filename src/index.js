import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../src/Components/App.css";
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
