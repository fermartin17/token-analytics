import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Dashboard} from "./pages/dashboard/Dashboard";

import Axios from "axios";

Axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/dashboard/pairs/:pairToken"} element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
