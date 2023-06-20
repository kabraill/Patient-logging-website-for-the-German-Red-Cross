import "./Patient.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";

import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Patient() {

    const navigate = useNavigate();
    const [fontColor, setFontColor] = useState(["red", "red"]);
    const [gender, setGender] = useState("unbekannt");
    const [alter, setAlter] = useState("");
    const [pub_token, setPub_token] = useState();

    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token');
            const isLoggedIn = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn');

            if (isLoggedIn === 'true' && token) {
                const decodedToken = await decodeToken(token);
                setPub_token(decodedToken);
                if (typeof decodedToken === 'undefined') {
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_token');
                    localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'false');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                    setLoading(false); // Update loading state
                    navigate('/');
                    return;
                }
                console.log(" dec :  " + new Date(decodedToken.exp * 1000))
                console.log("login page isLoggedIn === 'true' && token")



                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_token', await encodeToken(decodedToken.userId));
                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'true');

                console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token'));
                console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn'));
                setLoading(false); // Update loading state

            } else {
                setLoading(false);
                navigate('/');
            }
        }
        fetchData();
    }, []);

    const encodeToken = async (userId) => {
        try {
            const response = await axios.post("http://localhost:8800/user/encodeToken", {
                id: userId
            });
            return response.data;
        } catch (error) {
            console.log('Error:', error);
        }
    };


    const decodeToken = async (token) => {
        try {
            const response = await axios.post(
                "http://localhost:8800/user/decodeToken",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const nav_next = () => {
        navigate('/anamnese');
    }

    const nav_previous = () => {
        navigate('/beteiligte_einsatzkraefte');
    }

    function handleOnChange(e) {
        setGender(e.target.value);

        const copy_fontcolor = fontColor.slice();
        if (e.target.value === "unbekannt") {
            copy_fontcolor[0] = "red";
            setFontColor(copy_fontcolor);
        } else {
            copy_fontcolor[0] = "black";
            setFontColor(copy_fontcolor);
        }
    }

    function handleChangeAlter(e) {
        setAlter(e.target.value);

        const copy_fontcolor = fontColor.slice();
        if (e.target.value.match('^([0-9]+)$')) {
            copy_fontcolor[1] = "black";
            setFontColor(copy_fontcolor);
        } else {
            copy_fontcolor[1] = "red";
            setFontColor(copy_fontcolor);
        }
    }

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="patient">
            <Sidebar currentPage="patient" />
            <Topbar />
            <div className="patient_body">
                <span className="patient_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="patient">
            <Sidebar currentPage="patient" />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="patient_body">
                <span className="patient_body_title">
                    Patient
                </span>

                <div className="patient_body_components">
                    <div className="patient_body_components_line">

                        <span style={{ color: fontColor[0] }} className="patient_body_components_line_label">
                            Geschlecht: *
                        </span>
                        <div className="patient_body_components_line_right">
                            <select value={gender}
                                onChange={handleOnChange} id="select_custom" className="patient_body_components_line_right_dropdown">
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="unbekannt">unbekannt</option>
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="maennlich">männlich</option>
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="weiblich">weiblich</option>
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="sonstiges">sonstiges</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="patient_body_components_line">
                        <span style={{ color: fontColor[1] }} className="patient_body_components_line_label">
                            Alter: *
                        </span>
                        <div className="patient_body_components_line_right">
                            <input required type="text"
                                className="patient_body_components_line_right_txt"
                                value={alter}
                                onChange={handleChangeAlter}
                                placeholder="Z.B 60"
                                title="Alter"
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