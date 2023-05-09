import "./anamnese.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Anamnese() {

    const navigate = useNavigate();
    const [atemwege, setAtemwege] = useState("frei");
    const [isChecked_belueftung, setIsChecked_belueftung] = useState([false, false, false, false, false, false, false]);
    const [isChecked_puls, setIsChecked_puls] = useState([false, false, false, false, false]);
    const [isChecked_haut, setIsChecked_haut] = useState([false, false, false, false, false, false]);
    const [SonstigValue, setSonstigValue] = useState("");

    const nav_next = () => {
        navigate('/messwerte');
    }

    const nav_previous = () => {
        navigate('/patient');
    }

    const handleInputChange_SonstigValue = (event) => {
        setSonstigValue(event.target.value);
    }

    function handleOnChange(event) {
        setAtemwege(event.target.value);
    }

    function handleOnChange_belueftng(type) {
        if (type === "Unauffaellig") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Zyanose") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Rasseln") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Schnappatmung") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Atemnot") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Hyperventillation") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[5] = !newIsChecked[5];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Atemstillstand") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[6] = !newIsChecked[6];
            setIsChecked_belueftung(newIsChecked);
        }

    }

    function handleOnChange_puls(type) {
        if (type === "Regelmaeßig") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_puls(newIsChecked);

        } else if (type === "Unregelmaeßig") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_puls(newIsChecked);

        } else if (type === "Gut tastbar") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_puls(newIsChecked);
        } else if (type === "Schlecht tastbar") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_puls(newIsChecked);

        } else if (type === "Nicht tastbar") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_puls(newIsChecked);
        }
    }

    function handleOnChange_haut(type) {
        if (type === "Rosig") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Blass") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Blau") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Rot") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Warm") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Kalt") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[5] = !newIsChecked[5];
            setIsChecked_haut(newIsChecked);
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
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="radio"
                                    name="atemwege"
                                />
                                <span>Frei</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="radio"
                                    name="atemwege"
                                />
                                <span>Verlegt</span>
                            </div>
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span className="anamnese_body_components_line_label">
                            Belüftung: *
                        </span>
                        <div className="anamnese_body_components_line_right2">
                            <div className="anamnese_body_components_line_right2_body">
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={isChecked_belueftung[0]}
                                        onChange={() => handleOnChange_belueftng("Unauffaellig")}
                                    />
                                    <span>Unauffällig</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={isChecked_belueftung[1]}
                                        onChange={() => handleOnChange_belueftng("Zyanose")}
                                    />
                                    <span>Zyanose</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={isChecked_belueftung[2]}
                                        onChange={() => handleOnChange_belueftng("Rasseln")}
                                    />
                                    <span>Rasseln</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={isChecked_belueftung[3]}
                                        onChange={() => handleOnChange_belueftng("Schnappatmung")}
                                    />
                                    <span>Schnappatmung</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={isChecked_belueftung[4]}
                                        onChange={() => handleOnChange_belueftng("Atemnot")}
                                    />
                                    <span>Atemnot</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={isChecked_belueftung[5]}
                                        onChange={() => handleOnChange_belueftng("Hyperventillation")}
                                    />
                                    <span>Hyperventillation</span>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={isChecked_belueftung[6]}
                                        onChange={() => handleOnChange_belueftng("Atemstillstand")}
                                    />
                                    <span>Atemstillstand</span>
                                </div>
                            </div>
                            
                            <input type="text"
                                className="anamnese_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                value={SonstigValue}
                                onChange={handleInputChange_SonstigValue}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span className="anamnese_body_components_line_label">
                            Puls: *
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_puls[0]}
                                    onChange={() => handleOnChange_puls("Regelmaeßig")}
                                />
                                <span>Regelmäßig</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_puls[1]}
                                    onChange={() => handleOnChange_puls("Unregelmaeßig")}
                                />
                                <span>Unregelmäßig</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_puls[2]}
                                    onChange={() => handleOnChange_puls("Gut tastbar")}
                                />
                                <span>Gut tastbar</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_puls[3]}
                                    onChange={() => handleOnChange_puls("Schlecht tastbar")}
                                />
                                <span>Schlecht tastbar</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_puls[4]}
                                    onChange={() => handleOnChange_puls("Nicht tastbar")}
                                />
                                <span>Nicht tastbar</span>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span className="anamnese_body_components_line_label">
                            Haut: *
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_haut[0]}
                                    onChange={() => handleOnChange_haut("Rosig")}
                                />
                                <span>Rosig</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_haut[1]}
                                    onChange={() => handleOnChange_haut("Blass")}
                                />
                                <span>Blass</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_haut[2]}
                                    onChange={() => handleOnChange_haut("Blau")}
                                />
                                <span>Blau</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_haut[3]}
                                    onChange={() => handleOnChange_haut("Rot")}
                                />
                                <span>Rot</span>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_haut[4]}
                                    onChange={() => handleOnChange_haut("Warm")}
                                />
                                <span>Warm</span>
                            </div>

                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_haut[5]}
                                    onChange={() => handleOnChange_haut("Kalt")}
                                />
                                <span>Kalt</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="s1_body_buttons">
                    <button onClick={nav_previous} className="s1_body_buttons_btn_back"><ArrowBackIos />Vorherige</button>
                    <button onClick={nav_next} className="s1_body_buttons_btn_next">nächste<ArrowForwardIos /></button>
                </div>
            </div>
        </div>
    );
}