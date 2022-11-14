import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Card} from "./components/Card/Card";
import {CardDeck} from "./components/CardDeck/CardDeck";
import {Navbar} from "./components/Navbar/Navbar";
import {Sidebar} from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/card"} element={<Card/>}/>
        <Route path={"/deck"} element={<CardDeck/>}/>
        <Route path={"/navbar"} element={<Navbar/>}/>
        <Route path={"/sidebar"} element={<Sidebar/>}/>
      </Routes>
    </Router>
  );
};

export default App;
