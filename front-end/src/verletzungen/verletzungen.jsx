import "./verletzungen.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";

import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Verletzungen() {

    const navigate = useNavigate();
    const isChecked_Schaedel_Hirn = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Gesicht = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_HWS = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Thorax = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Abdomen = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_BWS_LWS = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Becken = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Obere_Extremitaeten = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Untere_Extremitaeten = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Weichteile = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
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
        navigate('/monitoring');
    }

    const nav_previous = () => {
        navigate('/neurologie');
    }

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="verletzungen">
            <Sidebar currentPage="verletzungen" />
            <Topbar />
            <div className="verletzungen_body">
                <span className="verletzungen_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="verletzungen">
            <Sidebar currentPage="verletzungen" />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="verletzungen_body">
                <span className="verletzungen_body_title">
                    Verletzungen
                </span>

                <div className="verletzungen_body_components">

                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            Schädel-Hirn:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_offen"
                                    ref={isChecked_Schaedel_Hirn.current[0]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_geschlossen"
                                    ref={isChecked_Schaedel_Hirn.current[1]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_leicht"
                                    ref={isChecked_Schaedel_Hirn.current[2]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_mittel"
                                    ref={isChecked_Schaedel_Hirn.current[3]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_schwer"
                                    ref={isChecked_Schaedel_Hirn.current[4]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            Gesicht:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_offen"
                                    ref={isChecked_Gesicht.current[0]}
                                />
                                <label htmlFor="verletzungen_gesicht_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_geschlossen"
                                    ref={isChecked_Gesicht.current[1]}
                                />
                                <label htmlFor="verletzungen_gesicht_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_leicht"
                                    ref={isChecked_Gesicht.current[2]}
                                />
                                <label htmlFor="verletzungen_gesicht_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_mittel"
                                    ref={isChecked_Gesicht.current[3]}
                                />
                                <label htmlFor="verletzungen_gesicht_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_schwer"
                                    ref={isChecked_Gesicht.current[4]}
                                />
                                <label htmlFor="verletzungen_gesicht_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            HWS:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_offen"
                                    ref={isChecked_HWS.current[0]}
                                />
                                <label htmlFor="verletzungen_hws_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_geschlossen"
                                    ref={isChecked_HWS.current[1]}
                                />
                                <label htmlFor="verletzungen_hws_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_leicht"
                                    ref={isChecked_HWS.current[2]}
                                />
                                <label htmlFor="verletzungen_hws_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_mittel"
                                    ref={isChecked_HWS.current[3]}
                                />
                                <label htmlFor="verletzungen_hws_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_schwer"
                                    ref={isChecked_HWS.current[4]}
                                />
                                <label htmlFor="verletzungen_hws_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            Thorax:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_offen"
                                    ref={isChecked_Thorax.current[0]}
                                />
                                <label htmlFor="verletzungen_thorax_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_geschlossen"
                                    ref={isChecked_Thorax.current[1]}
                                />
                                <label htmlFor="verletzungen_thorax_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_leicht"
                                    ref={isChecked_Thorax.current[2]}
                                />
                                <label htmlFor="verletzungen_thorax_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_mittel"
                                    ref={isChecked_Thorax.current[3]}
                                />
                                <label htmlFor="verletzungen_thorax_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_schwer"
                                    ref={isChecked_Thorax.current[4]}
                                />
                                <label htmlFor="verletzungen_thorax_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            Abdomen:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_offen"
                                    ref={isChecked_Abdomen.current[0]}
                                />
                                <label htmlFor="verletzungen_abdomen_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_geschlossen"
                                    ref={isChecked_Abdomen.current[1]}
                                />
                                <label htmlFor="verletzungen_abdomen_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_leicht"
                                    ref={isChecked_Abdomen.current[2]}
                                />
                                <label htmlFor="verletzungen_abdomen_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_mittel"
                                    ref={isChecked_Abdomen.current[3]}
                                />
                                <label htmlFor="verletzungen_abdomen_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_schwer"
                                    ref={isChecked_Abdomen.current[4]}
                                />
                                <label htmlFor="verletzungen_abdomen_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            BWS/LWS:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_offen"
                                    ref={isChecked_BWS_LWS.current[0]}
                                />
                                <label htmlFor="verletzungen_bws_lws_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_geschlossen"
                                    ref={isChecked_BWS_LWS.current[1]}
                                />
                                <label htmlFor="verletzungen_bws_lws_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_leicht"
                                    ref={isChecked_BWS_LWS.current[2]}
                                />
                                <label htmlFor="verletzungen_bws_lws_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_mittel"
                                    ref={isChecked_BWS_LWS.current[3]}
                                />
                                <label htmlFor="verletzungen_bws_lws_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_schwer"
                                    ref={isChecked_BWS_LWS.current[4]}
                                />
                                <label htmlFor="verletzungen_bws_lws_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            Becken:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_offen"
                                    ref={isChecked_Becken.current[0]}
                                />
                                <label htmlFor="verletzungen_becken_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_geschlossen"
                                    ref={isChecked_Becken.current[1]}
                                />
                                <label htmlFor="verletzungen_becken_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_leicht"
                                    ref={isChecked_Becken.current[2]}
                                />
                                <label htmlFor="verletzungen_becken_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_mittel"
                                    ref={isChecked_Becken.current[3]}
                                />
                                <label htmlFor="verletzungen_becken_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_schwer"
                                    ref={isChecked_Becken.current[4]}
                                />
                                <label htmlFor="verletzungen_becken_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            Obere Extremitäten:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_offen"
                                    ref={isChecked_Obere_Extremitaeten.current[0]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_geschlossen"
                                    ref={isChecked_Obere_Extremitaeten.current[1]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_leicht"
                                    ref={isChecked_Obere_Extremitaeten.current[2]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_mittel"
                                    ref={isChecked_Obere_Extremitaeten.current[3]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_schwer"
                                    ref={isChecked_Obere_Extremitaeten.current[4]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            Untere Extremitäten:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_offen"
                                    ref={isChecked_Untere_Extremitaeten.current[0]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_geschlossen"
                                    ref={isChecked_Untere_Extremitaeten.current[1]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_leicht"
                                    ref={isChecked_Untere_Extremitaeten.current[2]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_mittel"
                                    ref={isChecked_Untere_Extremitaeten.current[3]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_schwer"
                                    ref={isChecked_Untere_Extremitaeten.current[4]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_schwer">Schwer</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="verletzungen_body_components_line">
                        <span className="verletzungen_body_components_line_label">
                            Weichteile:
                        </span>
                        <div className="verletzungen_body_components_line_right3">
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_offen"
                                    ref={isChecked_Weichteile.current[0]}
                                />
                                <label htmlFor="verletzungen_weichteile_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_geschlossen"
                                    ref={isChecked_Weichteile.current[1]}
                                />
                                <label htmlFor="verletzungen_weichteile_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_leicht"
                                    ref={isChecked_Weichteile.current[2]}
                                />
                                <label htmlFor="verletzungen_weichteile_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_mittel"
                                    ref={isChecked_Weichteile.current[3]}
                                />
                                <label htmlFor="verletzungen_weichteile_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_schwer"
                                    ref={isChecked_Weichteile.current[4]}
                                />
                                <label htmlFor="verletzungen_weichteile_schwer">Schwer</label>
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