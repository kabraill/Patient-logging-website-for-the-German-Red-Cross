import "./seite_2.css"

import React, { useState } from "react";


import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Seite_2() {

    const [isChecked, setIsChecked] = useState([false, false, false]);

    function handleOnChange(type) {
        if (type === "Privat PKW") {
            const newIsChecked = isChecked.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked(newIsChecked);

        } else if (type === "Feuerwehr MTW") {
            const newIsChecked = isChecked.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked(newIsChecked);

        } else if (type === "58/19-2") {
            const newIsChecked = isChecked.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked(newIsChecked);

        }

    }

    return (
        <div className="s2">
            <Sidebar />
            <Topbar />
            <div className="s2_body">
                <span className="s2_body_title">
                    Beteiligte Einsatzkräfte
                </span>
                <div className="s2_body_components">
                    <div className="s2_body_components_line">
                        <span className="s2_body_components_line_label">
                            Eingesetzte Fahrzeuge: *
                        </span>
                        <div className="s2_body_components_line_right">
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[0]}
                                    onChange={() => handleOnChange("Privat PKW")}
                                />
                                <span>Privat PKW</span>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[1]}
                                    onChange={() => handleOnChange("Feuerwehr MTW")}
                                />
                                <span>Feuerwehr MTW</span>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[2]}
                                    onChange={() => handleOnChange("58/19-2")}
                                />
                                <span>58/19-2</span>
                            </div>

                        </div>
                    </div>

                    <div className="s2_body_components_line">
                        <span className="s2_body_components_line_label">
                            Einsatzkräfte am Patienten: *
                        </span>
                        <div className="s2_body_components_line_right">
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[0]}
                                    onChange={() => handleOnChange("Privat PKW")}
                                />
                                <span>Privat PKW</span>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[1]}
                                    onChange={() => handleOnChange("Feuerwehr MTW")}
                                />
                                <span>Feuerwehr MTW</span>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[2]}
                                    onChange={() => handleOnChange("58/19-2")}
                                />
                                <span>58/19-2</span>
                            </div>

                        </div>
                    </div>

                    <div className="s2_body_components_line">
                        <span className="s2_body_components_line_label">
                            Einsatzkräfte vor Ort:
                        </span>
                        <div className="s2_body_components_line_right">
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[0]}
                                    onChange={() => handleOnChange("Privat PKW")}
                                />
                                <span>Privat PKW</span>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[1]}
                                    onChange={() => handleOnChange("Feuerwehr MTW")}
                                />
                                <span>Feuerwehr MTW</span>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox"
                                    checked={isChecked[2]}
                                    onChange={() => handleOnChange("58/19-2")}
                                />
                                <span>58/19-2</span>
                            </div>

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