// Dependencias
import React from "react";
import ReactDOM from "react-dom/client";

// Componentes
import App from "./App";
import AddComponent from "./components/AddComponent/AddComponent";

// Estilos
import "bootstrap/dist/css/bootstrap.css";
// import "remixicon/fonts/remixicon.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <AddComponent/>
  </React.StrictMode>
);
