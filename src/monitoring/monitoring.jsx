import "./monitoring.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Monitoring() {

    const navigate = useNavigate();
    const [fontColor, setFontColor] = useState(["black", "black", "black", "black",
        "black", "black", "black", "black"])

    const [page_load, setPage_load] = useState(0);
    const [zeit_1, setzeit_1] = useState("");
    const [puls_1, setpuls_1] = useState("");
    const [blutdruck_1, setblutdruck_1] = useState("");
    const [SpO2_1, setSpO2_1] = useState("");

    const [zeit_2, setzeit_2] = useState("");
    const [puls_2, setpuls_2] = useState("");
    const [blutdruck_2, setblutdruck_2] = useState("");
    const [SpO2_2, setSpO2_2] = useState("");

    const nav_next = () => {
        navigate('/massnahmen_einsatzart');
    }

    const nav_previous = () => {
        navigate('/verletzungen');
    }

    const handleChange_zeit_1 = (e) => {
        setzeit_1(e.target.value);

        /*const newFontColor = fontColor.slice();
        if (e.target.value.match('^[0-9][0-9]:[0-9][0-9]$') || e.target.value === "") {
            newFontColor[0] = "black";
            setFontColor(newFontColor);

        }
        console.log("asaf");
        newFontColor[0] = "red";
        setFontColor(newFontColor);*/
    };


    const handleChange_puls_1 = (e) => {
        setpuls_1(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value.match('^([0-9]+)$')) {
            newFontColor[1] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[1] = "red";
            setFontColor(newFontColor);
        }
    };

    const handleChange_blutdruck_1 = (e) => {
        setblutdruck_1(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value.match('^[0-9]{1,3}\\/[0-9]{1,3}$')) {
            newFontColor[2] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[2] = "red";
            setFontColor(newFontColor);
        }
    };

    const handleChange_SpO2_1 = (e) => {
        setSpO2_1(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value.match('^([0-9]+)$')) {
            newFontColor[3] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[3] = "red";
            setFontColor(newFontColor);
        }
    };

    const handleChange_zeit_2 = (e) => {
        setzeit_2(e.target.value);
    };

    const handleChange_puls_2 = (e) => {
        setpuls_2(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value.match('^([0-9]+)$')) {
            newFontColor[5] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[5] = "red";
            setFontColor(newFontColor);
        }
    };

    const handleChange_blutdruck_2 = (e) => {
        setblutdruck_2(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value.match('^[0-9]{1,3}\\/[0-9]{1,3}$')) {
            newFontColor[6] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[6] = "red";
            setFontColor(newFontColor);
        }
    };

    const handleChange_SpO2_2 = (e) => {
        setSpO2_2(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value.match('^([0-9]+)$')) {
            newFontColor[7] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[7] = "red";
            setFontColor(newFontColor);
        }
    };

    return (
        <div className="monitoring">
            <Sidebar />
            <Topbar />

            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="monitoring_body">
                <span className="monitoring_body_title">
                    Monitoring
                </span>

                <div className="monitoring_body_components">
                    <div className="monitoring_body_components_line">
                        <span style={{ color: fontColor[0] }} className="monitoring_body_components_line_label">
                            1. Zeit:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="time"
                                className="monitoring_body_components_line_right_txt"
                                value={zeit_1}
                                onChange={handleChange_zeit_1}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span style={{ color: fontColor[1] }} className="monitoring_body_components_line_label">
                            1. Puls:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={puls_1}
                                onChange={handleChange_puls_1}
                                placeholder="Z.B 72"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span style={{ color: fontColor[2] }} className="monitoring_body_components_line_label">
                            1. Blutdruck:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={blutdruck_1}
                                onChange={handleChange_blutdruck_1}
                                placeholder="Z.B 120/80"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span style={{ color: fontColor[3] }} className="monitoring_body_components_line_label">
                            1. SpO2:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={SpO2_1}
                                onChange={handleChange_SpO2_1}
                                placeholder="Z.B 98"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span style={{ color: fontColor[4] }} className="monitoring_body_components_line_label">
                            2. Zeit:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="time"
                                className="monitoring_body_components_line_right_txt"
                                value={zeit_2}
                                onChange={handleChange_zeit_2}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span style={{ color: fontColor[5] }} className="monitoring_body_components_line_label">
                            2. Puls:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={puls_2}
                                onChange={handleChange_puls_2}
                                placeholder="Z.B 72"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span style={{ color: fontColor[6] }} className="monitoring_body_components_line_label">
                            2. Blutdruck:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={blutdruck_2}
                                onChange={handleChange_blutdruck_2}
                                placeholder="Z.B 120/80"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span style={{ color: fontColor[7] }} className="monitoring_body_components_line_label">
                            2. SpO2:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={SpO2_2}
                                onChange={handleChange_SpO2_2}
                                placeholder="Z.B 98"
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