import React from "react";
import Summary from "./components/Summary";
import Heading from "./components/Heading";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <Heading />
        <Summary />
      </div>
    </main>
  );
};

export default App;
