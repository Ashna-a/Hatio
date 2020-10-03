import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ProtectedRoutes from "./route";

function App() {
  return (
    <div className="App">
      <ProtectedRoutes />
    </div>
  );
}

export default App;
