import "./monitoring.css"

import React, { useState } from "react";


import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Monitoring() {

    const [zeit_1, setzeit_1] = useState("");
    const [puls_1, setpuls_1] = useState("");
    const [blutdruck_1, setblutdruck_1] = useState("");
    const [SpO2_1, setSpO2_1] = useState("");

    const [zeit_2, setzeit_2] = useState("");
    const [puls_2, setpuls_2] = useState("");
    const [blutdruck_2, setblutdruck_2] = useState("");
    const [SpO2_2, setSpO2_2] = useState("");

    const handleChange_zeit_1 = (e) => {
        setzeit_1(e.target.value);
    };

    const handleChange_puls_1 = (e) => {
        setpuls_1(e.target.value);
        if (e.target.value.match('^([0-9]+)$')) {

        } else {

        }
    };

    const handleChange_blutdruck_1 = (e) => {
        setblutdruck_1(e.target.value);
        if (e.target.value.match('^[0-9]{1,3}\\/[0-9]{1,3}$')) {

        } else {

        }
    };

    const handleChange_SpO2_1 = (e) => {
        setSpO2_1(e.target.value);
        if (e.target.value.match('^([0-9]+)$')) {

        } else {

        }
    };

    const handleChange_zeit_2 = (e) => {
        setzeit_2(e.target.value);
    };

    const handleChange_puls_2 = (e) => {
        setpuls_2(e.target.value);
        if (e.target.value.match('^([0-9]+)$')) {

        } else {

        }
    };

    const handleChange_blutdruck_2 = (e) => {
        setblutdruck_2(e.target.value);
        if (e.target.value.match('^[0-9]{1,3}\\/[0-9]{1,3}$')) {

        } else {

        }
    };

    const handleChange_SpO2_2 = (e) => {
        setSpO2_2(e.target.value);
        if (e.target.value.match('^([0-9]+)$')) {

        } else {

        }
    };

    return (
        <div className="monitoring">
            <Sidebar />
            <Topbar />

            <div className="monitoring_body">
                <span className="monitoring_body_title">
                    Monitoring
                </span>

                <div className="monitoring_body_components">
                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
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

                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
                            1. Puls:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={puls_1}
                                onChange={handleChange_puls_1}
                                placeholder="Z.B 60"
                            />
                        </div>
                    </div>

                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
                            1. Blutdruck:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={blutdruck_1}
                                onChange={handleChange_blutdruck_1}
                                placeholder="Z.B 10/20"
                            />
                        </div>
                    </div>

                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
                            1. SpO2:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={SpO2_1}
                                onChange={handleChange_SpO2_1}
                                placeholder="Z.B 76"
                            />
                        </div>
                    </div>

                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
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

                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
                            2. Puls:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={puls_2}
                                onChange={handleChange_puls_2}
                                placeholder="Z.B 60"
                            />
                        </div>
                    </div>

                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
                            2. Blutdruck:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={blutdruck_2}
                                onChange={handleChange_blutdruck_2}
                                placeholder="Z.B 10/20"
                            />
                        </div>
                    </div>

                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
                            2. SpO2:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                value={SpO2_2}
                                onChange={handleChange_SpO2_2}
                                placeholder="Z.B 76"
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