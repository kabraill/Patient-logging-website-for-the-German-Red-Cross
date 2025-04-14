import React from "react";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";

import Seite_1 from './seite_1/seite_1';


export default function App() {


  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Seite_1 />} />

        </Routes>
      </Router>
    </div>
  );
}