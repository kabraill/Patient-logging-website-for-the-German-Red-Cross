import "./monitoring.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";

import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Monitoring() {

    const navigate = useNavigate();

    const zeit_1 = useRef();
    const puls_1 = useRef();
    const blutdruck_1 = useRef();
    const SpO2_1 = useRef();

    const zeit_2 = useRef();
    const puls_2 = useRef();
    const blutdruck_2 = useRef();
    const SpO2_2 = useRef();

    const puls_1_l = useRef();
    const blutdruck_1_l = useRef();
    const SpO2_1_l = useRef();

    const puls_2_l = useRef();
    const blutdruck_2_l = useRef();
    const SpO2_2_l = useRef();


    const pub_token = useRef();

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
        navigate('/massnahmen_einsatzart');
    }

    const nav_previous = () => {
        navigate('/verletzungen');
    }

    const handleChange_puls_1 = (e) => {

        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            puls_1_l.current.style.color = "black";
        } else {
            puls_1_l.current.style.color = "red";
        }
    };

    const handleChange_blutdruck_1 = (e) => {

        if (e.target.value.match('^[0-9]{1,3}\\/[0-9]{1,3}$') || e.target.value === "") {
            blutdruck_1_l.current.style.color = "black";
        } else {
            blutdruck_1_l.current.style.color = "red";
        }
    };

    const handleChange_SpO2_1 = (e) => {
        
        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            SpO2_1_l.current.style.color = "black";
        } else {
            SpO2_1_l.current.style.color = "red";
        }
    };

    const handleChange_puls_2 = (e) => {
        
        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            puls_2_l.current.style.color = "black";
        } else {
            puls_2_l.current.style.color = "red";
        }
    };

    const handleChange_blutdruck_2 = (e) => {
    
        if (e.target.value.match('^[0-9]{1,3}\\/[0-9]{1,3}$') || e.target.value === "") {
            blutdruck_2_l.current.style.color = "black";
        } else {
            blutdruck_2_l.current.style.color = "red";
        }
    };

    const handleChange_SpO2_2 = (e) => {
        
        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            SpO2_2_l.current.style.color = "black";
        } else {
            SpO2_2_l.current.style.color = "red";
        }
    };

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="monitoring">
            <Sidebar currentPage="monitoring" />
            <Topbar />
            <div className="monitoring_body">
                <span className="monitoring_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="monitoring">
            <Sidebar currentPage="monitoring" />
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
                        <span className="monitoring_body_components_line_label">
                            1. Zeit:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="time"
                                className="monitoring_body_components_line_right_txt"
                                ref={zeit_1}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span ref={puls_1_l} className="monitoring_body_components_line_label">
                            1. Puls:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                ref={puls_1}
                                onChange={handleChange_puls_1}
                                placeholder="Z.B 72"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span ref={blutdruck_1_l} className="monitoring_body_components_line_label">
                            1. Blutdruck:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                ref={blutdruck_1}
                                onChange={handleChange_blutdruck_1}
                                placeholder="Z.B 120/80"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span ref={SpO2_1_l} className="monitoring_body_components_line_label">
                            1. SpO2:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                ref={SpO2_1}
                                onChange={handleChange_SpO2_1}
                                placeholder="Z.B 98"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span className="monitoring_body_components_line_label">
                            2. Zeit:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="time"
                                className="monitoring_body_components_line_right_txt"
                                ref={zeit_2}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span ref={puls_2_l} className="monitoring_body_components_line_label">
                            2. Puls:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                ref={puls_2}
                                onChange={handleChange_puls_2}
                                placeholder="Z.B 72"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span ref={blutdruck_2_l} className="monitoring_body_components_line_label">
                            2. Blutdruck:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                ref={blutdruck_2}
                                onChange={handleChange_blutdruck_2}
                                placeholder="Z.B 120/80"
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="monitoring_body_components_line">
                        <span ref={SpO2_2_l} className="monitoring_body_components_line_label">
                            2. SpO2:
                        </span>
                        <div className="monitoring_body_components_line_right">
                            <input type="text"
                                className="monitoring_body_components_line_right_txt"
                                ref={SpO2_2}
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