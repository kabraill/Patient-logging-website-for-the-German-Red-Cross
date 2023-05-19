import "./messwerte.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Messwerte() {

    const navigate = useNavigate();

    const [fontColor, setFontColor] = useState(["black", "black", "black"]);
    const [kein_color, setKein_color] = useState("rgb(255, 255, 255)");
    const [PulsValue, setPuls] = useState("");
    const [BlutdruckValue, setBlutdruck] = useState("");
    const [SPo2Value, setSPo2] = useState("");
    const [KeineMesswerteValue, setKeineMesswerte] = useState(false);

    const nav_next = () => {
        navigate('/neurologie');
    }

    const nav_previous = () => {
        navigate('/anamnese');
    }

    const handleInputChange_Puls = (e) => {
        setPuls(e.target.value);

        const copy_fontcolor = fontColor.slice();
        if (e.target.value.match("^([0-9]+)$") || e.target.value === "") {
            copy_fontcolor[0] = "black";
            setFontColor(copy_fontcolor);
        } else {
            copy_fontcolor[0] = "red";
            setFontColor(copy_fontcolor);
        }
    }

    const handleInputChange_Blutdruck = (e) => {
        setBlutdruck(e.target.value);

        const copy_fontcolor = fontColor.slice();
        if (e.target.value.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || e.target.value === "") {
            copy_fontcolor[1] = "black";
            setFontColor(copy_fontcolor);
        } else {
            copy_fontcolor[1] = "red";
            setFontColor(copy_fontcolor);
        }
    }

    const handleInputChange_SPo2Value = (e) => {
        setSPo2(e.target.value);

        const copy_fontcolor = fontColor.slice();
        if (e.target.value.match("^([0-9]+)$") || e.target.value === "") {
            copy_fontcolor[2] = "black";
            setFontColor(copy_fontcolor);
        } else {
            copy_fontcolor[2] = "red";
            setFontColor(copy_fontcolor);
        }
    }

    const handleCheckboxChange_KeineMesswerte = (event) => {
        setKeineMesswerte(event.target.checked);

        if (kein_color === "rgb(255, 255, 255)") {
            setKein_color("rgb(220, 220, 220)");
        } else {
            setKein_color("rgb(255, 255, 255)");
        }
    }

    useEffect(() => {
        document.getElementById("messwerte_keine_messwerte_label").style.background = kein_color;
    }, [kein_color]);

    return (
        <div className="messwerte">
            <Sidebar />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="messwerte_body">
                <span className="messwerte_body_title">
                    Messwerte
                </span>

                <div className="messwerte_body_components">
                    <div className="messwerte_body_components_line">
                        <span style={{ color: fontColor[0] }} className="messwerte_body_components_line_label">
                            Puls:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                value={PulsValue}
                                onChange={handleInputChange_Puls}
                                placeholder="Z.B 72"
                                disabled={KeineMesswerteValue}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="messwerte_body_components_line">
                        <span style={{ color: fontColor[1] }} className="messwerte_body_components_line_label">
                            Blutdruck:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                value={BlutdruckValue}
                                onChange={handleInputChange_Blutdruck}
                                placeholder="Z.B 120/80"
                                disabled={KeineMesswerteValue}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="messwerte_body_components_line">
                        <span style={{ color: fontColor[2] }} className="messwerte_body_components_line_label">
                            SpO2:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                value={SPo2Value}
                                onChange={handleInputChange_SPo2Value}
                                placeholder="Z.B 98"
                                disabled={KeineMesswerteValue}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="messwerte_body_components_line2">
                        <input type="checkbox"
                            id="messwerte_keine_messwerte"
                            checked={KeineMesswerteValue}
                            onChange={handleCheckboxChange_KeineMesswerte} />
                        <label id="messwerte_keine_messwerte_label" htmlFor="messwerte_keine_messwerte">Keine Messwerte</label>
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