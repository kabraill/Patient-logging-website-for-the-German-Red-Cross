import "./seite_1.css"

import React, { useState, useEffect } from "react";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowForwardIos
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function Seite_1() {
    const navigate = useNavigate();

    const [fontColor, setFontColor] = useState(["red", "red", "black",
        "red", "red", "black", "red"]);


    const [alarmkey, setAlarmkey] = useState("");
    const [auftragsnummer, setAuftragsnummer] = useState("");
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [keineAuftragNummerLabel, setkeineAuftragNummerLabel] = useState("rgb(255, 255, 255)");
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

        const newFontColor = fontColor.slice();

        if (e.target.value.match('^[0-9][0-9]:[0-9][0-9]$')) {
            newFontColor[6] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[6] = "red";
            setFontColor(newFontColor);
        }
    }

    const handleChange_ankunft_rtw_nef = (e) => {
        setAnkunft_rtw_nef(e.target.value);
    }

    const handleChange_ankunfthvo = (e) => {
        setAnkunfthvo(e.target.value);
        const newFontColor = fontColor.slice();

        if (e.target.value.match('^[0-9][0-9]:[0-9][0-9]$')) {
            newFontColor[4] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[4] = "red";
            setFontColor(newFontColor);
        }
    }

    const handleChange_alarmzeit = (e) => {
        setAlarmzeit(e.target.value);
        const newFontColor = fontColor.slice();

        if (e.target.value.match('^[0-9][0-9]:[0-9][0-9]$')) {
            newFontColor[3] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[3] = "red";
            setFontColor(newFontColor);
        }

    }

    const handleChange_einsatzort = (e) => {
        setEinsatzort(e.target.value);
    }

    function handleChangeCheckbox(e) {
        setIsCheckboxChecked(e.target.checked);

        if (keineAuftragNummerLabel === "rgb(255, 255, 255)") {
            setkeineAuftragNummerLabel("rgb(220, 220, 220)");
        } else {
            setkeineAuftragNummerLabel("rgb(255, 255, 255)");
        }
    }

    function handleChangealarmkey(e) {
        setAlarmkey(e.target.value);
        const newFontColor = fontColor.slice();


        if (e.target.value.match('^[123][0-9]{3}[NBnb]?$')) {
            newFontColor[0] = "black";
            //setAlarmkey(e.target.value);
            setFontColor(newFontColor);
        } else {
            newFontColor[0] = "red";
            setFontColor(newFontColor);
        }

    }

    function handleChangeAuftragsNummer(e) {
        setAuftragsnummer(e.target.value);
        const newFontColor = fontColor.slice();


        if (e.target.value.match('^([0-9]+)$')) {
            newFontColor[1] = "black";
            //setAlarmkey(e.target.value);
            setFontColor(newFontColor);

        } else {
            newFontColor[1] = "red";
            setFontColor(newFontColor);
        }

    }

    useEffect(() => {
        document.getElementById("s1_keine_nummer").style.background = keineAuftragNummerLabel;
    }, [keineAuftragNummerLabel]);

    
    return (

        <div className="s1">
            <Sidebar />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="s1_body">
                <span className="s1_body_title">
                    Einsatzdaten
                </span>
                <div className="s1_body_components">
                    <div className="s1_body_components_line">
                        <span style={{ color: fontColor[0] }} className="s1_body_components_line_label">
                            Alarmschlüssel: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                onChange={handleChangealarmkey}
                                value={alarmkey}
                                placeholder="Z.B 1234N"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span style={{ color: fontColor[1] }} className="s1_body_components_line_label">
                            Auftragsnummer: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                value={auftragsnummer}
                                onChange={handleChangeAuftragsNummer}
                                placeholder="Z.B 23"
                                disabled={isCheckboxChecked}
                            />

                            <input id="einsatzdaten_auftragnummer" checked={isCheckboxChecked} onChange={handleChangeCheckbox} type="checkbox" className="s1_body_components_line_right_nonr" />
                            <label htmlFor="einsatzdaten_auftragnummer" id="s1_keine_nummer" className="s1_body_components_line_right_nonrtxt">
                                Keine Auftragsnummer
                            </label>
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Einsatzort:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                value={einsatzort}
                                onChange={handleChange_einsatzort}
                                placeholder="Z.B Ulrich Straße 40"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span style={{ color: fontColor[3] }} className="s1_body_components_line_label">
                            Alarmzeit: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                className="s1_body_components_line_right_txt"
                                value={alarmzeit}
                                onChange={handleChange_alarmzeit}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span style={{ color: fontColor[4] }} className="s1_body_components_line_label">
                            Ankunft HvO: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                className="s1_body_components_line_right_txt"
                                value={ankunfthvo}
                                onChange={handleChange_ankunfthvo}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Ankunft RTW / NEF:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input type="time"
                                className="s1_body_components_line_right_txt"
                                value={ankunft_rtw_nef}
                                onChange={handleChange_ankunft_rtw_nef}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span style={{ color: fontColor[6] }} className="s1_body_components_line_label">
                            Einsatzende: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                className="s1_body_components_line_right_txt"
                                value={einsatzende}
                                onChange={handleChange_einsatzende}
                            />
                        </div>
                    </div>

                </div>

                <div className="s1_body_buttons_special">
                    <button onClick={nav_next} className="s1_body_buttons_btn_next">Nächste<ArrowForwardIos /></button>
                </div>

            </div>
        </div>
    );
}