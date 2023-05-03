import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LLogin from './login/login';
import Seite_1 from './seite_1/seite_1';
import Seite_2 from './seite_2/seite_2';
import Patient from './patient/Patient';
import Anamnese from './anamnese/anamnese';
import Messwerte from './messwerte/messwerte';
import Neurologie from './neurologie/neurologie';
import Verletzungen from './verletzungen/verletzungen';
import Monitoring from './monitoring/monitoring';
import Massnahmen_einsatzart from './maßnahmen_einsatzart/massnahmen_einsatzart';

export default function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LLogin/>} />
          <Route path="/seite_1" element={<Seite_1/>} />
          <Route path="/seite_2" element={<Seite_2/>} />
          <Route path="/patient" element={<Patient/>} />
          <Route path="/anamnese" element={<Anamnese/>} />
          <Route path="/messwerte" element={<Messwerte/>} />
          <Route path="/neurologie" element={<Neurologie/>} />
          <Route path="/verletzungen" element={<Verletzungen/>} />
          <Route path="/monitoring" element={<Monitoring/>} />
          <Route path="/massnahmen_einsatzart" element={<Massnahmen_einsatzart/>} />
        </Routes>
      </Router>
    </div>
  );
}
