// src/App.tsx
import React from "react";
import Router from "./router";
import Counter from "./pages/Counter";
import SimpleBar from "simplebar-react";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
