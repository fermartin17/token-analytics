import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Card} from "./components/Card/Card";
import {CardDeck} from "./components/CardDeck/CardDeck";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/card"} element={<Card/>}/>
        <Route path={"/deck"} element={<CardDeck/>}/>
      </Routes>
    </Router>
  );
};

export default App;
