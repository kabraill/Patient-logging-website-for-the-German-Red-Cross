import "./Patient.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Patient() {

    const navigate = useNavigate();

    const [borderColor, setBorderColor] = useState("black");
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [gender, setGender] = useState("unbekannt");
    const [alter, setAlter] = useState("");

    const nav_next = () => {
        navigate('/anamnese');
    }

    const nav_previous = () => {
        navigate('/seite_2');
    }

    function handleOnChange(e) {
        setGender(e.target.value);
    }

    function handleChangeAlter(e) {
        setAlter(e.target.value);

        if (e.target.value.match('^([0-9]+)$')) {
            setBorderColor("black");
            setBackgroundColor("white");
        } else {
            setBorderColor("red");
            setBackgroundColor("rgba(255, 0, 0, 0.2)");
        }
    }

    useEffect(() => {
        
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
                                value={alter}
                                onChange={handleChangeAlter}
                                placeholder="Alter"
                                title="Alter"
                            />
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