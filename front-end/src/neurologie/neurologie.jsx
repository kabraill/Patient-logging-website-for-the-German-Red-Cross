import "./neurologie.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Neurologie() {

    const navigate = useNavigate();
    
    const Bewusstsein = useRef("orientiert");
    const Blutzucker = useRef();
    const isChecked_PupilleLinks = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_PupilleRechts = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const Schmerzen = useRef("keine");
    const Schmerzskala = useRef();

    const Blutzucker_l = useRef();
    const Schmerzskala_l = useRef();

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
        navigate('/verletzungen');
    }

    const nav_previous = () => {
        navigate('/messwerte');
    }

    const handleInputChange_Blutzucker = (e) => {
        
        if (e.target.value.match("^([0-9]+|low|high)$") || e.target.value === "") {
            Blutzucker_l.current.style.color = "black";
        } else {
            Blutzucker_l.current.style.color = "red";
        }
    }

    const handleInputChange_Schmerzskala = (e) => {
        
        if (e.target.value.match("^([0-9]|10)$") || e.target.value === "") {
            Schmerzskala_l.current.style.color = "black";
        } else {
            Schmerzskala_l.current.style.color = "red";
        }
    }

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="neurologie">
            <Sidebar currentPage="neurologie" />
            <Topbar />
            <div className="neurologie_body">
                <span className="neurologie_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="neurologie">
            <Sidebar currentPage="neurologie" />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="neurologie_body">
                <span className="neurologie_body_title">
                    Neurologie
                </span>
                <div className="neurologie_body_components">

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Bewusstsein: *
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <select id="select_custom" ref={Bewusstsein}
                                className="neurologie_body_components_line_right_singleselect">
                                <option id="option_custom" value="orientiert">Orientiert</option>
                                <option id="option_custom" value="desorientiert">Desorientiert</option>
                                <option id="option_custom" value="getruebt">getrübt</option>
                                <option id="option_custom" value="bewusstlos">Bewusstlos</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="neurologie_body_components_line">
                        <span ref={Blutzucker_l} className="neurologie_body_components_line_label">
                            Blutzucker:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <input type="text"
                                className="neurologie_body_components_line_right1_txt"
                                ref={Blutzucker}
                                onChange={handleInputChange_Blutzucker}
                                placeholder="Z.B 80 "
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Pupille links:
                        </span>
                        <div className="neurologie_body_components_line_right3">
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_eng"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[0]}
                                />
                                <label htmlFor="neurologie_pupille_links_eng">Eng</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_mittel"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[1]}
                                />
                                <label htmlFor="neurologie_pupille_links_mittel">Mittel</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_weit"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[2]}
                                />
                                <label htmlFor="neurologie_pupille_links_weit">Weit</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_keine_lichtreflexe"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[3]}
                                />
                                <label htmlFor="neurologie_pupille_links_keine_lichtreflexe">keine Lichtreflexe</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_entrundet"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[4]}
                                />
                                <label htmlFor="neurologie_pupille_links_entrundet">Entrundet</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Pupille Rechts:
                        </span>
                        <div className="neurologie_body_components_line_right3">
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_eng"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[0]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_eng">Eng</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_mittel"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[1]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_mittel">Mittel</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_weit"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[2]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_weit">Weit</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_keine_lichtreflexe"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[3]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_keine_lichtreflexe">keine Lichtreflexe</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_entrundet"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[4]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_entrundet">Entrundet</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Schmerzen:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <select id="select_custom" ref={Schmerzen}
                                className="neurologie_body_components_line_right_singleselect">
                                <option id="option_custom" value="keine">Keine</option>
                                <option id="option_custom" value="leicht">Leicht</option>
                                <option id="option_custom" value="mittel">Mittel</option>
                                <option id="option_custom" value="stark">Stark</option>
                                <option id="option_custom" value="kolikartig">Kolikartig</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="neurologie_body_components_line">
                        <span ref={Schmerzskala_l} className="neurologie_body_components_line_label">
                            Schmerzskala 0-10:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <input type="text"
                                className="neurologie_body_components_line_right1_txt"
                                ref={Schmerzskala}
                                onChange={handleInputChange_Schmerzskala}
                                placeholder="0 - 10"
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