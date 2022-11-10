import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Card} from "./components/Card/Card";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/card"} element={<Card/>}/>
      </Routes>
    </Router>
  );
};

export default App;
