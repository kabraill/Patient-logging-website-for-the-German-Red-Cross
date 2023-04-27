import "./neurologie.css"

import React, { useState } from "react";


import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Neurologie() {

    const [Bewusstsein, setBewusstsein] = useState("orientiert");
    const [Blutzucker, setBlutzucker] = useState("");
    const [isChecked_PupilleLinks, setIsChecked_PupilleLinks] = useState([false, false, false, false, false]);
    const [isChecked_PupilleRechts, setIsChecked_PupilleRechts] = useState([false, false, false, false, false]);
    const [Schmerzen, setSchmerzen] = useState("keine");
    const [Schmerzskala, setSchmerzskala] = useState("");

    function handleOnChange_Bewusstsein(event) {
        setBewusstsein(event.target.value);
    }

    function handleOnChange_Schmerzen(event) {
        setSchmerzen(event.target.value);
    }

    const handleInputChange_Blutzucker = (e) => {
        setBlutzucker(e.target.value);
        if (e.target.value.match("^([0-9]+|low|high)$")) {

        } else {

        }
    }

    const handleInputChange_Schmerzskala = (e) => {
        setSchmerzskala(e.target.value);
        if (e.target.value.match("^([0-9]|10)$")) {

        } else {

        }
    }

    function handleOnChange_PupilleLinks(type) {
        if (type === "Eng") {
            const newIsChecked = isChecked_PupilleLinks.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_PupilleLinks(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_PupilleLinks.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_PupilleLinks(newIsChecked);

        } else if (type === "Weit") {
            const newIsChecked = isChecked_PupilleLinks.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_PupilleLinks(newIsChecked);

        } else if (type === "keine Lichtreflexe") {
            const newIsChecked = isChecked_PupilleLinks.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_PupilleLinks(newIsChecked);

        } else if (type === "Entrundet") {
            const newIsChecked = isChecked_PupilleLinks.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_PupilleLinks(newIsChecked);

        }

    }

    function handleOnChange_PupilleRechts(type) {
        if (type === "Eng") {
            const newIsChecked = isChecked_PupilleRechts.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_PupilleRechts(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_PupilleRechts.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_PupilleRechts(newIsChecked);

        } else if (type === "Weit") {
            const newIsChecked = isChecked_PupilleRechts.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_PupilleRechts(newIsChecked);

        } else if (type === "keine Lichtreflexe") {
            const newIsChecked = isChecked_PupilleRechts.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_PupilleRechts(newIsChecked);

        } else if (type === "Entrundet") {
            const newIsChecked = isChecked_PupilleRechts.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_PupilleRechts(newIsChecked);

        }

    }

    return (
        <div className="neurologie">
            <Sidebar />
            <Topbar />
            <div className="neurologie_body">
                <span className="neurologie_body_title">
                    Neurologie
                </span>
                <div className="neurologie_body_components">

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Bewusstsein: *
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <select value={Bewusstsein}
                                onChange={handleOnChange_Bewusstsein} className="neurologie_body_components_line_right_singleselect">
                                <option value="orientiert">Orientiert</option>
                                <option value="desorientiert">Desorientiert</option>
                                <option value="getruebt">getrübt</option>
                                <option value="bewusstlos">Bewusstlos</option>
                            </select>
                        </div>
                    </div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Blutzucker:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <input type="text"
                                className="neurologie_body_components_line_right1_txt"
                                value={Blutzucker}
                                onChange={handleInputChange_Blutzucker}
                                placeholder="Z.B 123 oder low "
                            />
                        </div>
                    </div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Pupille links:
                        </span>
                        <div className="neurologie_body_components_line_right3">
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[0]}
                                    onChange={() => handleOnChange_PupilleLinks("Eng")}
                                />
                                <span>Eng</span>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[1]}
                                    onChange={() => handleOnChange_PupilleLinks("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[2]}
                                    onChange={() => handleOnChange_PupilleLinks("Weit")}
                                />
                                <span>Weit</span>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[3]}
                                    onChange={() => handleOnChange_PupilleLinks("keine Lichtreflexe")}
                                />
                                <span>keine Lichtreflexe</span>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[4]}
                                    onChange={() => handleOnChange_PupilleLinks("Entrundet")}
                                />
                                <span>Entrundet</span>
                            </div>

                        </div>
                    </div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Pupille Rechts:
                        </span>
                        <div className="neurologie_body_components_line_right3">
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[0]}
                                    onChange={() => handleOnChange_PupilleRechts("Eng")}
                                />
                                <span>Eng</span>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[1]}
                                    onChange={() => handleOnChange_PupilleRechts("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[2]}
                                    onChange={() => handleOnChange_PupilleRechts("Weit")}
                                />
                                <span>Weit</span>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[3]}
                                    onChange={() => handleOnChange_PupilleRechts("keine Lichtreflexe")}
                                />
                                <span>keine Lichtreflexe</span>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[4]}
                                    onChange={() => handleOnChange_PupilleRechts("Entrundet")}
                                />
                                <span>Entrundet</span>
                            </div>

                        </div>
                    </div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Schmerzen:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <select value={Schmerzen}
                                onChange={handleOnChange_Schmerzen} className="neurologie_body_components_line_right_singleselect">
                                <option value="keine">Keine</option>
                                <option value="leicht">Leicht</option>
                                <option value="mittel">Mittel</option>
                                <option value="stark">Stark</option>
                                <option value="kolikartig">Kolikartig</option>
                            </select>
                        </div>
                    </div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Schmerzskala 0-10:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <input type="text"
                                className="neurologie_body_components_line_right1_txt"
                                value={Schmerzskala}
                                onChange={handleInputChange_Schmerzskala}
                                placeholder="0 - 10"
                            />
                        </div>
                    </div>
                </div>

                <div className="s1_body_buttons">
                    <button className="s1_body_buttons_btn_back"><ArrowBackIos />Vorherige</button>
                    <button className="s1_body_buttons_btn_next">nächste<ArrowForwardIos /></button>
                </div>
            </div>
        </div>
    );
}