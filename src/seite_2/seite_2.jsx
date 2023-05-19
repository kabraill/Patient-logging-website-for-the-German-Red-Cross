import "./seite_2.css"

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Seite_2() {

    const navigate = useNavigate();
    const [page_load, setPage_load] = useState(0);
    const [fontColor, setFontColor] = useState(["red", "red"]);
    const [isChecked, setIsChecked] = useState([false, false, false]);
    const [Einsatzkraefte_patienten, setEinsatzkraefte_patienten] = useState([false, false, false]);
    const [Einsatzkraefte_ort, setEinsatzkraefte_ort] = useState([false, false, false]);

    const nav_next = () => {
        navigate('/patient');
    }

    const nav_previous = () => {
        navigate('/seite_1');
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



    useEffect(() => {
        if (page_load == 0) {
            setPage_load(page_load + 1);
            console.log(page_load)
        } else {
            const fontcolor_copy = fontColor.slice();
            if (!isChecked.includes(true)) {
                fontcolor_copy[0] = "red"
                setFontColor(fontcolor_copy);
            } else {
                fontcolor_copy[0] = "black"
                setFontColor(fontcolor_copy);
            }
        }

    }, [isChecked]);


    function handleOnChange_Einsatzkraefte_patienten(type) {

        if (type === "X") {
            const newIsChecked = Einsatzkraefte_patienten.slice();
            newIsChecked[0] = !newIsChecked[0];
            setEinsatzkraefte_patienten(newIsChecked);

        } else if (type === "Y") {
            const newIsChecked = Einsatzkraefte_patienten.slice();
            newIsChecked[1] = !newIsChecked[1];
            setEinsatzkraefte_patienten(newIsChecked);

        } else if (type === "Z") {
            const newIsChecked = Einsatzkraefte_patienten.slice();
            newIsChecked[2] = !newIsChecked[2];
            setEinsatzkraefte_patienten(newIsChecked);

        }

    }

    useEffect(() => {
        if (page_load == 0) {
            setPage_load(page_load + 1);
        } else {
            const fontcolor_copy = fontColor.slice();
            if (!Einsatzkraefte_patienten.includes(true)) {
                fontcolor_copy[1] = "red"
                setFontColor(fontcolor_copy);
            } else {
                fontcolor_copy[1] = "black"
                setFontColor(fontcolor_copy);
            }
        }

    }, [Einsatzkraefte_patienten]);

    function handleOnChange_Einsatzkraefte_ort(type) {

        if (type === "X") {
            const newIsChecked = Einsatzkraefte_ort.slice();
            newIsChecked[0] = !newIsChecked[0];
            setEinsatzkraefte_ort(newIsChecked);

        } else if (type === "Y") {
            const newIsChecked = Einsatzkraefte_ort.slice();
            newIsChecked[1] = !newIsChecked[1];
            setEinsatzkraefte_ort(newIsChecked);

        } else if (type === "Z") {
            const newIsChecked = Einsatzkraefte_ort.slice();
            newIsChecked[2] = !newIsChecked[2];
            setEinsatzkraefte_ort(newIsChecked);

        }

    }

    return (
        <div className="s2">
            <Sidebar />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="s2_body">
                <span className="s2_body_title">
                    Beteiligte Einsatzkräfte
                </span>
                <div className="s2_body_components">
                    <div className="s2_body_components_line">
                        <span style={{ color: fontColor[0] }} className="s2_body_components_line_label">
                            Eingesetzte Fahrzeuge: *
                        </span>
                        <div className="s2_body_components_line_right">
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_private_pkw"
                                    checked={isChecked[0]}
                                    onChange={() => handleOnChange("Privat PKW")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_private_pkw">Privat PKW</label>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_feuerwehr_mtw"
                                    checked={isChecked[1]}
                                    onChange={() => handleOnChange("Feuerwehr MTW")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_feuerwehr_mtw">Feuerwehr MTW</label>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_58_19_2"
                                    checked={isChecked[2]}
                                    onChange={() => handleOnChange("58/19-2")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_58_19_2">58/19-2</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s2_body_components_line">
                        <span style={{ color: fontColor[1] }} className="s2_body_components_line_label">
                            Einsatzkräfte am Patienten: *
                        </span>
                        <div className="s2_body_components_line_right">
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_patienten_x"
                                    checked={Einsatzkraefte_patienten[0]}
                                    onChange={() => handleOnChange_Einsatzkraefte_patienten("X")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_patienten_x">X</label>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_patienten_y"
                                    checked={Einsatzkraefte_patienten[1]}
                                    onChange={() => handleOnChange_Einsatzkraefte_patienten("Y")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_patienten_y">Y</label>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_patienten_z"
                                    checked={Einsatzkraefte_patienten[2]}
                                    onChange={() => handleOnChange_Einsatzkraefte_patienten("Z")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_patienten_z">Z</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s2_body_components_line">
                        <span className="s2_body_components_line_label">
                            Einsatzkräfte vor Ort:
                        </span>
                        <div className="s2_body_components_line_right">
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_ort_x"
                                    checked={Einsatzkraefte_ort[0]}
                                    onChange={() => handleOnChange_Einsatzkraefte_ort("X")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_ort_x">X</label>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_ort_y"
                                    checked={Einsatzkraefte_ort[1]}
                                    onChange={() => handleOnChange_Einsatzkraefte_ort("Y")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_ort_y">Y</label>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_ort_z"
                                    checked={Einsatzkraefte_ort[2]}
                                    onChange={() => handleOnChange_Einsatzkraefte_ort("Z")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_ort_z">Z</label>
                            </div>

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