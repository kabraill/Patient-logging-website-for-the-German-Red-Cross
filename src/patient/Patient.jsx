import "./Patient.css"

import React, { useState, useEffect } from "react";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Patient() {
    const [borderColor, setBorderColor] = useState("black");
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [gender, setGender] = useState("unbekannt");

    function handleOnChange(event) {
        setGender(event.target.value);
    }

    function handleChangeAlter(e) {


        if (e.target.value.match('^([0-9]+)$')) {
            //setAlarmkey(e.target.value);
            setBorderColor("black");
            setBackgroundColor("white");
        } else {
            setBorderColor("red");
            setBackgroundColor("rgba(255, 0, 0, 0.2)");
        }
    }

    useEffect(() => {
        console.log(gender);
    })

    return (
        <div className="patient">
            <Sidebar />
            <Topbar />
            <div className="patient_body">
                <span className="patient_body_title">
                    Patient
                </span>

                <div className="patient_body_components">
                    <div className="patient_body_components_line">
                        <span className="patient_body_components_line_label">
                            Geschlecht: *
                        </span>
                        <div className="patient_body_components_line_right">
                            <select value={gender}
                                onChange={handleOnChange} className="patient_body_components_line_right_txt">
                                <option value="unbekannt">unbekannt</option>
                                <option value="maennlich">männlich</option>
                                <option value="weiblich">weiblich</option>
                                <option value="sonstiges">sonstiges</option>
                            </select>
                        </div>
                    </div>

                    <div className="patient_body_components_line">
                        <span className="patient_body_components_line_label">
                            Alter: *
                        </span>
                        <div className="patient_body_components_line_right">
                            <input required type="text"
                                className="patient_body_components_line_right_txt"
                                style={{ borderColor: borderColor[0], backgroundColor: backgroundColor[0] }}
                                onChange={handleChangeAlter}
                                placeholder="Alter"
                                title="Alter"
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