import "./massnahmen_einsatzart.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

import axios from "axios";

export default function Massnahmen_einsatzart() {

    const navigate = useNavigate();

    const ischeckedMassnahmen_value = useRef([useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(),
        useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]);
    const Anzahl_Schocks = useRef();
    const Gegebene_Liter_min = useRef();
    const ischeckedEinsatzart_value = useRef([useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(),
        useRef()]);
    const sonstigg = useRef();
    const Weitere_beteiligte_Einsatzkraefte = useRef([useRef(), useRef()]);
    const sonstigg2 = useRef();
    const Uebergabe_an = useRef();
    const Freitext = useRef();
    const pub_token = useRef();

    const Anzahl_Schocks_l = useRef();
    const Gegebene_Liter_min_l = useRef();
    const Uebergabe_an_l = useRef();

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

    const nav_previous = () => {
        navigate('/monitoring');
    }

    const nav_next = () => {
        navigate('/vorschau');
    }

    const handleInputChange_Uebergabe_an = (e) => {
        
        if (e.target.value === "") {
            Uebergabe_an_l.current.style.color = "red";
        } else {
            Uebergabe_an_l.current.style.color = "black";
        }
    }

    const handleInputChange_Anzahl_Schocks = (e) => {
        
        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            Anzahl_Schocks_l.current.style.color = "black";
        } else {
            Anzahl_Schocks_l.current.style.color = "red";
        }
    }

    const handleInputChange_Gegebene_Liter_min = (e) => {
        
        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            Gegebene_Liter_min_l.current.style.color = "black";
        } else {
            Gegebene_Liter_min_l.current.style.color = "red";
        }
    }

    

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="massnahmen_einsatzart">
            <Sidebar currentPage="massnahmen_einsatzart" />
            <Topbar />
            <div className="massnahmen_einsatzart_body">
                <span className="massnahmen_einsatzart_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="massnahmen_einsatzart">
            <Sidebar currentPage="massnahmen_einsatzart" />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="massnahmen_einsatzart_body">
                <span className="massnahmen_einsatzart_body_title">
                    Maßnahmen & Einsatzart
                </span>

                <div className="massnahmen_einsatzart_body_components">
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Maßnahmen:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right3">
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_atemwege_freimachen"
                                    ref={ischeckedMassnahmen_value.current[0]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_atemwege_freimachen">Atemwege freimachen</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_larynxtubus"
                                    ref={ischeckedMassnahmen_value.current[1]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_larynxtubus">Larynxtubus</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_o2_gabe"
                                    ref={ischeckedMassnahmen_value.current[2]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_o2_gabe">O2 Gabe</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_brille_maske_beutel"
                                    ref={ischeckedMassnahmen_value.current[3]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_brille_maske_beutel">Brille/Maske/Beutel</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_sonstiges_siehe_text"
                                    ref={ischeckedMassnahmen_value.current[4]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_sonstiges_siehe_text">sonstiges ...siehe Text</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_herzdruckmassage"
                                    ref={ischeckedMassnahmen_value.current[5]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_herzdruckmassage">Herzdruckmassage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_aed"
                                    ref={ischeckedMassnahmen_value.current[6]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_aed">AED</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_wunderversorgung"
                                    ref={ischeckedMassnahmen_value.current[7]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_wunderversorgung">Wundversorgung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_hws_fixierung"
                                    ref={ischeckedMassnahmen_value.current[8]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_hws_fixierung">HWS Fixierung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_na_nachforderung"
                                    ref={ischeckedMassnahmen_value.current[9]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_na_nachforderung">NA Nachforderung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_seitenlage"
                                    ref={ischeckedMassnahmen_value.current[10]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_seitenlage">Seitenlage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_oberkorper_hoch_sitzend"
                                    ref={ischeckedMassnahmen_value.current[11]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_oberkorper_hoch_sitzend">Oberkörper hoch/sitzend</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_flachlagerung"
                                    ref={ischeckedMassnahmen_value.current[12]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_flachlagerung">Flachlagerung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_schocklage"
                                    ref={ischeckedMassnahmen_value.current[13]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_schocklage">Schocklage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_ruhigstellung"
                                    ref={ischeckedMassnahmen_value.current[14]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_ruhigstellung">Ruhigstellung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_absicherung"
                                    ref={ischeckedMassnahmen_value.current[15]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_absicherung">Absicherung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_einweisung_rd"
                                    ref={ischeckedMassnahmen_value.current[16]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_einweisung_rd">Einweisung RD</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_unterstutzung_rd"
                                    ref={ischeckedMassnahmen_value.current[17]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_unterstutzung_rd">Unterstützung RD</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_nnd_abwartend"
                                    ref={ischeckedMassnahmen_value.current[18]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_nnd_abwartend">NND abwartend</label>
                            </div>

                            <input placeholder="Sonstiges" className="massnahmen_einsatzart_body_components_line_right3_sontiges" />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span ref={Anzahl_Schocks_l} className="massnahmen_einsatzart_body_components_line_label">
                            Bei AED: Anzahl Schocks:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                ref={Anzahl_Schocks}
                                onChange={handleInputChange_Anzahl_Schocks}
                                placeholder="Z.B 2"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span ref={Gegebene_Liter_min_l} className="massnahmen_einsatzart_body_components_line_label">
                            Bei O2: Gegebene Liter/min:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                ref={Gegebene_Liter_min}
                                onChange={handleInputChange_Gegebene_Liter_min}
                                placeholder="Z.B 4"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Einsatzart:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right2">
                            <div className="massnahmen_einsatzart_body_components_line_right2_body">
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_verkehrsunfall"
                                        ref={ischeckedEinsatzart_value.current[0]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_verkehrsunfall">Verkehrsunfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_chirurgischer_notfall"
                                        ref={ischeckedEinsatzart_value.current[1]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_chirurgischer_notfall">Chirurgischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_internistischer_notfall"
                                        ref={ischeckedEinsatzart_value.current[2]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_internistischer_notfall">Internistischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect_marking">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_reanimation"
                                        ref={ischeckedEinsatzart_value.current[3]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_reanimation">Reanimation</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_infektionseinsatz"
                                        ref={ischeckedEinsatzart_value.current[4]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_infektionseinsatz">Infektionseinsatz</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_paediatrischer_notfall"
                                        ref={ischeckedEinsatzart_value.current[5]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_paediatrischer_notfall">Paediatrischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_arbeitsunfall"
                                        ref={ischeckedEinsatzart_value.current[6]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_arbeitsunfall">Arbeitsunfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_gynaekologischer_notfall"
                                        ref={ischeckedEinsatzart_value.current[7]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_gynaekologischer_notfall">Gynäkologischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_fehleinsatz_siehe_protokoll_fehleinsatz"
                                        ref={ischeckedEinsatzart_value.current[8]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_fehleinsatz_siehe_protokoll_fehleinsatz">Fehleinsatz ..siehe Protokoll Fehleinsatz..</label>
                                </div>

                            </div>
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                ref={sonstigg}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Weitere beteiligte Einsatzkräfte:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right4">
                            <div className="massnahmen_einsatzart_body_components_line_right2_body">
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        id="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_feuerwehr"
                                        type="checkbox"
                                        ref={Weitere_beteiligte_Einsatzkraefte.current[0]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_feuerwehr">Feuerwehr</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_polizei"
                                        ref={Weitere_beteiligte_Einsatzkraefte.current[1]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_polizei">Polizei</label>
                                </div>
                            </div>

                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                ref={sonstigg2}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span ref={Uebergabe_an_l} className="massnahmen_einsatzart_body_components_line_label">
                            Übergabe an: *
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                ref={Uebergabe_an}
                                onChange={handleInputChange_Uebergabe_an}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Freitext:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <textarea type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                ref={Freitext}
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