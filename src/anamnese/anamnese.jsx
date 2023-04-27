import "./anamnese.css"

import React, { useState, useEffect } from "react";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Anamnese() {

    const [isChecked, setIsChecked] = useState([false, false, false]);
    const [atemwege, setAtemwege] = useState("Frei");


    function handleOnChange(event) {
        setAtemwege(event.target.value);
    }

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
        <div className="anamnese">
            <Sidebar />
            <Topbar />

            <div className="anamnese_body">
                <span className="anamnese_body_title">
                    Anamnese
                </span>
                <div className="anamnese_body_components">
                    <div className="anamnese_body_components_line">
                        <span className="anamnese_body_components_line_label">
                            Atemwege: *
                        </span>
                        <div className="anamnese_body_components_line_right1">
                            <select value={atemwege}
                                onChange={handleOnChange} className="anamnese_body_components_line_right_singleselect">
                                <option value="frei">Frei</option>
                                <option value="verlegt">Verlegt</option>
                            </select>
                        </div>
                    </div>

                    <div className="anamnese_body_components_line">
                        <span className="anamnese_body_components_line_label">
                            Belüftung: *
                        </span>
                        <div className="anamnese_body_components_line_right2">
                            <div className="anamnese_body_components_line_right2_body">
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                    /*checked={isChecked[0]}*/
                                    /*onChange={() => handleOnChange("Privat PKW")}*/
                                    />
                                    <span>Unauffällig</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                    /*checked={isChecked[1]}*/
                                    /*onChange={() => handleOnChange("Feuerwehr MTW")}*/
                                    />
                                    <span>Zyanose</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                    /*checked={isChecked[2]}*/
                                    /*onChange={() => handleOnChange("58/19-2")}*/
                                    />
                                    <span>Rasseln</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                    /*checked={isChecked[0]}*/
                                    /*onChange={() => handleOnChange("Privat PKW")}*/
                                    />
                                    <span>Schnappatmung</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                    /*checked={isChecked[1]}*/
                                    /*onChange={() => handleOnChange("Feuerwehr MTW")}*/
                                    />
                                    <span>Atemnot</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                    /*checked={isChecked[2]}*/
                                    /*onChange={() => handleOnChange("58/19-2")}*/
                                    />
                                    <span>Hyperventillation</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                    /*checked={isChecked[2]}*/
                                    /*onChange={() => handleOnChange("58/19-2")}*/
                                    />
                                    <span>Atemstillstand</span>
                                </div>
                            </div>
                            <input required type="text"
                                className="anamnese_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                            />
                        </div>
                    </div>

                    <div className="anamnese_body_components_line">
                        <span className="anamnese_body_components_line_label">
                            Einsatzkräfte vor Ort:
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                /*checked={isChecked[0]}*/
                                /*onChange={() => handleOnChange("Privat PKW")}*/
                                />
                                <span>Privat PKW</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                /*checked={isChecked[1]}*/
                                /*onChange={() => handleOnChange("Feuerwehr MTW")}*/
                                />
                                <span>Feuerwehr MTW</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                /*checked={isChecked[2]}*/
                                /*onChange={() => handleOnChange("58/19-2")}*/
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