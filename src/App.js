import LLogin from "./login/login";
import Seite_1 from "./seite_1/seite_1";
import Seite_2 from "./seite_2/seite_2";
import Patient from "./patient/Patient";
import Anamnese from "./anamnese/anamnese";
import Messwerte from "./messwerte/messwerte";
import Neurologie from "./neurologie/neurologie";
import Verletzungen from "./verletzungen/verletzungen";
import Monitoring from "./monitoring/monitoring";
import Massnahmen_einsatzart from "./maßnahmen_einsatzart/massnahmen_einsatzart";
///////////////////////////////////////////////////////////////////////////////


export default function App() {



  return (
    <div className="App">
      <Massnahmen_einsatzart/>
    </div>
  );
}
