import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Card} from "./components/Card/Card";
import {CardDeck} from "./components/CardDeck/CardDeck";
import {Navbar} from "./components/Navbar/Navbar";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {CardSection} from"./pages/dashboard/sections/CardSection";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {LineChartPlot} from "./components/LineChart/LineChart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/card"} element={<Card/>}/>
        <Route path={"/deck"} element={<CardDeck/>}/>
        <Route path={"/navbar"} element={<Navbar/>}/>
        <Route path={"/sidebar"} element={<Sidebar/>}/>
        <Route path={"/section"} element={<CardSection/>}/>
        <Route path={"/dashboard/:pairToken"} element={<Dashboard/>}/>
        <Route path={"/chart"} element={<LineChartPlot/>}/>
      </Routes>
    </Router>
  );
};

export default App;
