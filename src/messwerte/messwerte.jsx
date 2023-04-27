import "./messwerte.css"

import React, { useState } from "react";


import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Messwerte() {

    const [PulsValue, setPuls] = useState("");
    const [BlutdruckValue, setBlutdruck] = useState("");
    const [SPo2Value, setSPo2] = useState("");
    const [KeineMesswerteValue, setKeineMesswerte] = useState(false);

    const handleInputChange_Puls = (event) => {
        setPuls(event.target.value);
    }

    const handleInputChange_Blutdruck = (e) => {
        setBlutdruck(e.target.value);
        if (e.target.value.match('^[0-9]{2,3}\\/[0-9]{2,3}$')) {
           
        } else {
            
        }
    }

    const handleInputChange_SPo2Value = (e) => {
        setSPo2(e.target.value);
        if (e.target.value.match("^([0-9]+)$")) {
           
        } else {
            
        }
    }

    const handleCheckboxChange_KeineMesswerte = (event) => {
        setKeineMesswerte(event.target.checked);
    }

    return (
        <div className="messwerte">
            <Sidebar />
            <Topbar />
            <div className="messwerte_body">
                <span className="messwerte_body_title">
                    Messwerte
                </span>

                <div className="messwerte_body_components">
                    <div className="messwerte_body_components_line">
                        <span className="messwerte_body_components_line_label">
                            Puls:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                value={PulsValue}
                                onChange={handleInputChange_Puls}
                            />
                        </div>
                    </div>

                    <div className="messwerte_body_components_line">
                        <span className="messwerte_body_components_line_label">
                            Blutdruck:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                value={BlutdruckValue}
                                onChange={handleInputChange_Blutdruck}
                                placeholder="Z.B 23/45"
                            />
                        </div>
                    </div>

                    <div className="messwerte_body_components_line">
                        <span className="messwerte_body_components_line_label">
                            SpO2:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                value={SPo2Value}
                                onChange={handleInputChange_SPo2Value}
                                placeholder="Z.B 34"
                            />
                        </div>
                    </div>

                    <div className="messwerte_body_components_line2">
                        <input type="checkbox"
                            checked={KeineMesswerteValue}
                            onChange={handleCheckboxChange_KeineMesswerte} />
                        <span>Keine Messwerte</span>
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