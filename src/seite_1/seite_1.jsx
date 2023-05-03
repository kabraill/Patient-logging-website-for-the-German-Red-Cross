import "./seite_1.css"

import React, { useState } from "react";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function Seite_1() {
    const navigate = useNavigate();

    const [borderColor, setBorderColor] = useState(["black", "black", "black",
        "black", "black", "black", "black"]);
    const [backgroundColor, setBackgroundColor] = useState(["white", "white", "white",
        "white", "white", "white", "white"]);

    const [alarmkey, setAlarmkey] = useState("");
    const [auftragsnummer, setAuftragsnummer] = useState("");
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [einsatzort, setEinsatzort] = useState("");
    const [alarmzeit, setAlarmzeit] = useState("");
    const [ankunfthvo, setAnkunfthvo] = useState("");
    const [ankunft_rtw_nef, setAnkunft_rtw_nef] = useState("");
    const [einsatzende, setEinsatzende] = useState("");

    const nav_next = () => {
        navigate('/seite_2');
    }

    const handleChange_einsatzende = (e) => {
        setEinsatzende(e.target.value);
    }

    const handleChange_ankunft_rtw_nef = (e) =>{
        setAnkunft_rtw_nef(e.target.value);
    }

    const handleChange_ankunfthvo = (e) =>{
        setAnkunfthvo(e.target.value);
    }

    const handleChange_alarmzeit = (e) =>{
        setAlarmzeit(e.target.value);
    }

    const handleChange_einsatzort = (e) =>{
        setEinsatzort(e.target.value);
    }

    function handleChangeCheckbox(e) {
        setIsCheckboxChecked(e.target.checked);

    }

    function handleChangealarmkey(e) {
        setAlarmkey(e.target.value);
        const newBorderColor = borderColor.slice();
        const newBackgroundColor = backgroundColor.slice();

        if (e.target.value.match('^[123][0-9]{3}[NBnb]?$')) {
            newBorderColor[0] = "black";
            newBackgroundColor[0] = "white";
            //setAlarmkey(e.target.value);
            setBorderColor(newBorderColor);
            setBackgroundColor(newBackgroundColor);
        } else {
            newBorderColor[0] = "red";
            newBackgroundColor[0] = "rgba(255, 0, 0, 0.2)";
            setBorderColor(newBorderColor);
            setBackgroundColor(newBackgroundColor);
        }

    }

    function handleChangeAuftragsNummer(e) {
        setAuftragsnummer(e.target.value);
        const newBorderColor = borderColor.slice();
        const newBackgroundColor = backgroundColor.slice();

        if (e.target.value.match('^([0-9]+)$')) {
            newBorderColor[1] = "black";
            newBackgroundColor[1] = "white";
            //setAlarmkey(e.target.value);
            setBorderColor(newBorderColor);
            setBackgroundColor(newBackgroundColor);
        } else {
            newBorderColor[1] = "red";
            newBackgroundColor[1] = "rgba(255, 0, 0, 0.2)";
            setBorderColor(newBorderColor);
            setBackgroundColor(newBackgroundColor);
        }

    }


    return (

        <div className="s1">
            <Sidebar />
            <Topbar />
            <div className="s1_body">
                <span className="s1_body_title">
                    Einsatzdaten
                </span>
                <div className="s1_body_components">
                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Alarmschlüssel: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                style={{ borderColor: borderColor[0], backgroundColor: backgroundColor[0] }}
                                onChange={handleChangealarmkey}
                                value={alarmkey}
                                placeholder={/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mit finger halten um den Hinweis zu lesen" : "Maus darauf platzieren um den Hinweis zu lesen"}
                                title="Die Eingabe sollte entweder mit 1, 2 oder 3 beginnen, gefolgt von drei Ziffern, und dann gefolgt von einem optionalen N oder B (Groß-/Kleinschreibung wird nicht beachtet)."
                            />
                        </div>
                    </div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Auftragsnummer: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                style={{ borderColor: borderColor[1], backgroundColor: backgroundColor[1] }}
                                value={auftragsnummer}
                                onChange={handleChangeAuftragsNummer}
                                placeholder="Schreiben Sie eine oder mehrere Ziffern"
                                title="Schreiben Sie eine oder mehrere Ziffern"
                                disabled={isCheckboxChecked}
                            />
                            <input checked={isCheckboxChecked} onChange={handleChangeCheckbox} type="checkbox" className="s1_body_components_line_right_nonr" />
                            <span className="s1_body_components_line_right_nonrtxt">
                                Keine Auftragsnummer
                            </span>
                        </div>
                    </div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Einsatzort:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                value={einsatzort}
                                onChange={handleChange_einsatzort}
                                style={{ borderColor: borderColor[2], backgroundColor: backgroundColor[2] }}
                            />
                        </div>
                    </div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Alarmzeit: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                className="s1_body_components_line_right_txt"
                                value={alarmzeit}
                                onChange={handleChange_alarmzeit}
                                style={{ borderColor: borderColor[3], backgroundColor: backgroundColor[3] }}
                            />
                        </div>
                    </div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Ankunft HvO: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                className="s1_body_components_line_right_txt"
                                value={ankunfthvo}
                                onChange={handleChange_ankunfthvo}
                                style={{ borderColor: borderColor[4], backgroundColor: backgroundColor[4] }}
                            />
                        </div>
                    </div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Ankunft RTW / NEF:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input type="time"
                                className="s1_body_components_line_right_txt"
                                value={ankunft_rtw_nef}
                                onChange={handleChange_ankunft_rtw_nef}
                                style={{ borderColor: borderColor[5], backgroundColor: backgroundColor[5] }}
                            />
                        </div>
                    </div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Einsatzende: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                className="s1_body_components_line_right_txt"
                                value={einsatzende}
                                onChange={handleChange_einsatzende}
                                style={{ borderColor: borderColor[6], backgroundColor: backgroundColor[6] }}
                            />
                        </div>
                    </div>

                </div>

                <div className="s1_body_buttons_special">
                    <button onClick={nav_next} className="s1_body_buttons_btn_next">nächste<ArrowForwardIos /></button>
                </div>
            </div>
        </div>
    );
}