import "./messwerte.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

import axios from "axios";

export default function Messwerte() {

    const navigate = useNavigate();

    
    const PulsValue = useRef();
    const BlutdruckValue = useRef();
    const SPo2Value = useRef();
    const [KeineMesswerteValue, setKeineMesswerte] = useState(false);
    const pub_token = useRef();

    const PulsValue_l = useRef();
    const BlutdruckValue_l = useRef();
    const SPo2Value_l = useRef();

    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token');
            const isLoggedIn = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn');

            if (isLoggedIn === 'true' && token) {
                const decodedToken = await decodeToken(token);
                pub_token.current = decodedToken;
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
        navigate('/neurologie');
    }

    const nav_previous = () => {
        navigate('/anamnese');
    }

    const handleInputChange_Puls = (e) => {
    
        if (e.target.value.match("^([0-9]+)$") || e.target.value === "") {
            PulsValue_l.current.style.color = "black";
        } else {
            PulsValue_l.current.style.color = "red";
        }
    }

    const handleInputChange_Blutdruck = (e) => {
    
        if (e.target.value.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || e.target.value === "") {
            BlutdruckValue_l.current.style.color = "black";
        } else {
            BlutdruckValue_l.current.style.color = "red";
        }
    }

    const handleInputChange_SPo2Value = (e) => {
        
        if (e.target.value.match("^([0-9]+)$") || e.target.value === "") {
            SPo2Value_l.current.style.color = "black";
        } else {
            SPo2Value_l.current.style.color = "red";
        }
    }

    const handleCheckboxChange_KeineMesswerte = (event) => {
        setKeineMesswerte(event.target.checked);

        if (event.target.checked === true) {
            document.getElementById("messwerte_keine_messwerte_label").style.background = "rgb(220, 220, 220)";
        } else {
            document.getElementById("messwerte_keine_messwerte_label").style.background = "rgb(255, 255, 255)";
        }
    }

    

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="messwerte">
            <Sidebar currentPage="messwerte" />
            <Topbar />
            <div className="messwerte_body">
                <span className="messwerte_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="messwerte">
            <Sidebar currentPage="messwerte" />
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
                        <span ref={PulsValue_l} className="messwerte_body_components_line_label">
                            Puls:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                ref={PulsValue}
                                onChange={handleInputChange_Puls}
                                placeholder="Z.B 72"
                                disabled={KeineMesswerteValue}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="messwerte_body_components_line">
                        <span ref={BlutdruckValue_l} className="messwerte_body_components_line_label">
                            Blutdruck:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                ref={BlutdruckValue}
                                onChange={handleInputChange_Blutdruck}
                                placeholder="Z.B 120/80"
                                disabled={KeineMesswerteValue}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="messwerte_body_components_line">
                        <span ref={SPo2Value_l} className="messwerte_body_components_line_label">
                            SpO2:
                        </span>
                        <div className="messwerte_body_components_line_right">
                            <input type="text"
                                className="messwerte_body_components_line_right_txt"
                                ref={SPo2Value}
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