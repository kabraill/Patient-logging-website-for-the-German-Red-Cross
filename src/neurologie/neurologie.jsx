import "./neurologie.css"

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Neurologie() {

    const navigate = useNavigate();
    const [fontColor, setFontColor] = useState(["black", "black"])
    const [Bewusstsein, setBewusstsein] = useState("orientiert");
    const [Blutzucker, setBlutzucker] = useState("");
    const [isChecked_PupilleLinks, setIsChecked_PupilleLinks] = useState([false, false, false, false, false]);
    const [isChecked_PupilleRechts, setIsChecked_PupilleRechts] = useState([false, false, false, false, false]);
    const [Schmerzen, setSchmerzen] = useState("keine");
    const [Schmerzskala, setSchmerzskala] = useState("");

    const nav_next = () => {
        navigate('/verletzungen');
    }

    const nav_previous = () => {
        navigate('/messwerte');
    }

    function handleOnChange_Bewusstsein(event) {
        setBewusstsein(event.target.value);
    }

    function handleOnChange_Schmerzen(event) {
        setSchmerzen(event.target.value);
    }

    const handleInputChange_Blutzucker = (e) => {
        setBlutzucker(e.target.value);

        const copy_fontcolor = fontColor.slice();
        if (e.target.value.match("^([0-9]+|low|high)$") || e.target.value === "") {
            copy_fontcolor[0] = "black";
            setFontColor(copy_fontcolor);
        } else {
            copy_fontcolor[0] = "red";
            setFontColor(copy_fontcolor);
        }
    }

    const handleInputChange_Schmerzskala = (e) => {
        setSchmerzskala(e.target.value);

        const copy_fontcolor = fontColor.slice();
        if (e.target.value.match("^([0-9]|10)$") || e.target.value === "") {
            copy_fontcolor[1] = "black";
            setFontColor(copy_fontcolor);
        } else {
            copy_fontcolor[1] = "red";
            setFontColor(copy_fontcolor);
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
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="neurologie_body">
                <span className="neurologie_body_title">
                    Neurologie
                </span>
                <div className="neurologie_body_components">

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Bewusstsein: *
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <select id="select_custom" value={Bewusstsein}
                                onChange={handleOnChange_Bewusstsein} className="neurologie_body_components_line_right_singleselect">
                                <option id="option_custom" value="orientiert">Orientiert</option>
                                <option id="option_custom" value="desorientiert">Desorientiert</option>
                                <option id="option_custom" value="getruebt">getrübt</option>
                                <option id="option_custom" value="bewusstlos">Bewusstlos</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="neurologie_body_components_line">
                        <span style={{ color: fontColor[0] }} className="neurologie_body_components_line_label">
                            Blutzucker:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <input type="text"
                                className="neurologie_body_components_line_right1_txt"
                                value={Blutzucker}
                                onChange={handleInputChange_Blutzucker}
                                placeholder="Z.B 80 "
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Pupille links:
                        </span>
                        <div className="neurologie_body_components_line_right3">
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_eng"
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[0]}
                                    onChange={() => handleOnChange_PupilleLinks("Eng")}
                                />
                                <label htmlFor="neurologie_pupille_links_eng">Eng</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_mittel"
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[1]}
                                    onChange={() => handleOnChange_PupilleLinks("Mittel")}
                                />
                                <label htmlFor="neurologie_pupille_links_mittel">Mittel</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_weit"
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[2]}
                                    onChange={() => handleOnChange_PupilleLinks("Weit")}
                                />
                                <label htmlFor="neurologie_pupille_links_weit">Weit</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_keine_lichtreflexe"
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[3]}
                                    onChange={() => handleOnChange_PupilleLinks("keine Lichtreflexe")}
                                />
                                <label htmlFor="neurologie_pupille_links_keine_lichtreflexe">keine Lichtreflexe</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_entrundet"
                                    type="checkbox"
                                    checked={isChecked_PupilleLinks[4]}
                                    onChange={() => handleOnChange_PupilleLinks("Entrundet")}
                                />
                                <label htmlFor="neurologie_pupille_links_entrundet">Entrundet</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Pupille Rechts:
                        </span>
                        <div className="neurologie_body_components_line_right3">
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_eng"
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[0]}
                                    onChange={() => handleOnChange_PupilleRechts("Eng")}
                                />
                                <label htmlFor="neurologie_pupille_rechts_eng">Eng</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_mittel"
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[1]}
                                    onChange={() => handleOnChange_PupilleRechts("Mittel")}
                                />
                                <label htmlFor="neurologie_pupille_rechts_mittel">Mittel</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_weit"
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[2]}
                                    onChange={() => handleOnChange_PupilleRechts("Weit")}
                                />
                                <label htmlFor="neurologie_pupille_rechts_weit">Weit</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_keine_lichtreflexe"
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[3]}
                                    onChange={() => handleOnChange_PupilleRechts("keine Lichtreflexe")}
                                />
                                <label htmlFor="neurologie_pupille_rechts_keine_lichtreflexe">keine Lichtreflexe</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_entrundet"
                                    type="checkbox"
                                    checked={isChecked_PupilleRechts[4]}
                                    onChange={() => handleOnChange_PupilleRechts("Entrundet")}
                                />
                                <label htmlFor="neurologie_pupille_rechts_entrundet">Entrundet</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Schmerzen:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <select id="select_custom" value={Schmerzen}
                                onChange={handleOnChange_Schmerzen} className="neurologie_body_components_line_right_singleselect">
                                <option id="option_custom" value="keine">Keine</option>
                                <option id="option_custom" value="leicht">Leicht</option>
                                <option id="option_custom" value="mittel">Mittel</option>
                                <option id="option_custom" value="stark">Stark</option>
                                <option id="option_custom" value="kolikartig">Kolikartig</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="neurologie_body_components_line">
                        <span style={{ color: fontColor[1] }} className="neurologie_body_components_line_label">
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
                    <button onClick={nav_previous} className="s1_body_buttons_btn_back"><ArrowBackIos />Vorherige</button>
                    <button onClick={nav_next} className="s1_body_buttons_btn_next">Nächste<ArrowForwardIos /></button>
                </div>
            </div>
        </div>
    );
}