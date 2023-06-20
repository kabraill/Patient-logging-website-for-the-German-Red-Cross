import "./massnahmen_einsatzart.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

import axios from "axios";

export default function Massnahmen_einsatzart() {

    const navigate = useNavigate();

    const [fontColor, setFontColor] = useState(["black", "black", "red"])
    const [ischeckedMassnahmen_value, Setischeckedmassnahmen_value] = useState([false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false, false]);
    const [Anzahl_Schocks, setAnzahl_Schocks] = useState("");
    const [Gegebene_Liter_min, setGegebene_Liter_min] = useState("");
    const [ischeckedEinsatzart_value, SetischeckedEinsatzart_value] = useState([false, false, false, false, false, false, false, false,
        false]);
    const [sonstigg, setSonstigg] = useState("");
    const [Weitere_beteiligte_Einsatzkraefte, setWeitere_beteiligte_Einsatzkraefte] = useState([false, false]);
    const [sonstigg2, setSonstigg2] = useState("");
    const [Uebergabe_an, setUebergabe_an] = useState("");
    const [Freitext, setFreitext] = useState("");
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

    const nav_previous = () => {
        navigate('/monitoring');
    }

    const nav_next = () => {
        navigate('/vorschau');
    }

    const handleInputChange_Freitext = (e) => {
        setFreitext(e.target.value);
    }

    const handleInputChange_Uebergabe_an = (e) => {
        setUebergabe_an(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value === "") {
            newFontColor[2] = "red";
            setFontColor(newFontColor);
        } else {
            newFontColor[2] = "black";
            setFontColor(newFontColor);
        }
    }

    const handleInputChange_sonstigg2 = (e) => {
        setSonstigg2(e.target.value);
    }

    const handleInputChange_sonstigg = (e) => {
        setSonstigg(e.target.value);
    }

    const handleInputChange_Anzahl_Schocks = (e) => {
        setAnzahl_Schocks(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            newFontColor[0] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[0] = "red";
            setFontColor(newFontColor);
        }
    }

    const handleInputChange_Gegebene_Liter_min = (e) => {
        setGegebene_Liter_min(e.target.value);

        const newFontColor = fontColor.slice();
        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            newFontColor[1] = "black";
            setFontColor(newFontColor);
        } else {
            newFontColor[1] = "red";
            setFontColor(newFontColor);
        }
    }

    const handleOnChange_Weitere_beteiligte_Einsatzkraefte = (type) => {
        if (type === "Feuerwehr") {
            const newIsChecked = Weitere_beteiligte_Einsatzkraefte.slice();
            newIsChecked[0] = !newIsChecked[0];
            setWeitere_beteiligte_Einsatzkraefte(newIsChecked);

        } else if (type === "Polizei") {
            const newIsChecked = Weitere_beteiligte_Einsatzkraefte.slice();
            newIsChecked[1] = !newIsChecked[1];
            setWeitere_beteiligte_Einsatzkraefte(newIsChecked);

        }
    }

    const handleOnChange_massnahmen = (type) => {
        if (type === "Atemwege freimachen") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[0] = !newIsChecked[0];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Larynxtubus") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[1] = !newIsChecked[1];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "O2 Gabe") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[2] = !newIsChecked[2];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Brille/Maske/Beutel") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[3] = !newIsChecked[3];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "sonstiges ...siehe Text") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[4] = !newIsChecked[4];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Herzdruckmassage") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[5] = !newIsChecked[5];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "AED") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[6] = !newIsChecked[6];
            Setischeckedmassnahmen_value(newIsChecked);
        } else if (type === "Wundversorgung") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[7] = !newIsChecked[7];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "HWS Fixierung") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[8] = !newIsChecked[8];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "NA Nachforderung") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[9] = !newIsChecked[9];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Seitenlage") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[10] = !newIsChecked[10];
            Setischeckedmassnahmen_value(newIsChecked);
        } else if (type === "Oberkoerper hoch/sitzend") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[11] = !newIsChecked[11];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Flachlagerung") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[12] = !newIsChecked[12];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Schocklage") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[13] = !newIsChecked[13];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Ruhigstellung") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[14] = !newIsChecked[14];
            Setischeckedmassnahmen_value(newIsChecked);
        } else if (type === "Absicherung") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[15] = !newIsChecked[15];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Einweisung RD") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[16] = !newIsChecked[16];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "Unterstuetzung RD") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[17] = !newIsChecked[17];
            Setischeckedmassnahmen_value(newIsChecked);

        } else if (type === "NND abwartend") {
            const newIsChecked = ischeckedMassnahmen_value.slice();
            newIsChecked[18] = !newIsChecked[18];
            Setischeckedmassnahmen_value(newIsChecked);
        }
    };

    const handleOnChange_einsatzart = (type) => {
        if (type === "Verkehrsunfall") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[0] = !newIsChecked[0];
            SetischeckedEinsatzart_value(newIsChecked);

        } else if (type === "Chirurgischer Notfall") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[1] = !newIsChecked[1];
            SetischeckedEinsatzart_value(newIsChecked);

        } else if (type === "Internistischer Notfall") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[2] = !newIsChecked[2];
            SetischeckedEinsatzart_value(newIsChecked);

        } else if (type === "Reanimation") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[3] = !newIsChecked[3];
            SetischeckedEinsatzart_value(newIsChecked);

        } else if (type === "Infektionseinsatz") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[4] = !newIsChecked[4];
            SetischeckedEinsatzart_value(newIsChecked);

        } else if (type === "Paediatrischer Notfall") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[5] = !newIsChecked[5];
            SetischeckedEinsatzart_value(newIsChecked);

        } else if (type === "Arbeitsunfall") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[6] = !newIsChecked[6];
            SetischeckedEinsatzart_value(newIsChecked);
        } else if (type === "Gynaekologischer Notfall") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[7] = !newIsChecked[7];
            SetischeckedEinsatzart_value(newIsChecked);

        } else if (type === "Fehleinsatz ..siehe Protokoll Fehleinsatz..") {
            const newIsChecked = ischeckedEinsatzart_value.slice();
            newIsChecked[8] = !newIsChecked[8];
            SetischeckedEinsatzart_value(newIsChecked);

        }
    };

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
                                    checked={ischeckedMassnahmen_value[0]}
                                    onChange={() => handleOnChange_massnahmen("Atemwege freimachen")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_atemwege_freimachen">Atemwege freimachen</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_larynxtubus"
                                    checked={ischeckedMassnahmen_value[1]}
                                    onChange={() => handleOnChange_massnahmen("Larynxtubus")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_larynxtubus">Larynxtubus</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_o2_gabe"
                                    checked={ischeckedMassnahmen_value[2]}
                                    onChange={() => handleOnChange_massnahmen("O2 Gabe")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_o2_gabe">O2 Gabe</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_brille_maske_beutel"
                                    checked={ischeckedMassnahmen_value[3]}
                                    onChange={() => handleOnChange_massnahmen("Brille/Maske/Beutel")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_brille_maske_beutel">Brille/Maske/Beutel</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_sonstiges_siehe_text"
                                    checked={ischeckedMassnahmen_value[4]}
                                    onChange={() => handleOnChange_massnahmen("sonstiges ...siehe Text")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_sonstiges_siehe_text">sonstiges ...siehe Text</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_herzdruckmassage"
                                    checked={ischeckedMassnahmen_value[5]}
                                    onChange={() => handleOnChange_massnahmen("Herzdruckmassage")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_herzdruckmassage">Herzdruckmassage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_aed"
                                    checked={ischeckedMassnahmen_value[6]}
                                    onChange={() => handleOnChange_massnahmen("AED")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_aed">AED</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_wunderversorgung"
                                    checked={ischeckedMassnahmen_value[7]}
                                    onChange={() => handleOnChange_massnahmen("Wundversorgung")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_wunderversorgung">Wundversorgung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_hws_fixierung"
                                    checked={ischeckedMassnahmen_value[8]}
                                    onChange={() => handleOnChange_massnahmen("HWS Fixierung")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_hws_fixierung">HWS Fixierung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_na_nachforderung"
                                    checked={ischeckedMassnahmen_value[9]}
                                    onChange={() => handleOnChange_massnahmen("NA Nachforderung")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_na_nachforderung">NA Nachforderung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_seitenlage"
                                    checked={ischeckedMassnahmen_value[10]}
                                    onChange={() => handleOnChange_massnahmen("Seitenlage")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_seitenlage">Seitenlage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_oberkorper_hoch_sitzend"
                                    checked={ischeckedMassnahmen_value[11]}
                                    onChange={() => handleOnChange_massnahmen("Oberkoerper hoch/sitzend")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_oberkorper_hoch_sitzend">Oberkörper hoch/sitzend</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_flachlagerung"
                                    checked={ischeckedMassnahmen_value[12]}
                                    onChange={() => handleOnChange_massnahmen("Flachlagerung")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_flachlagerung">Flachlagerung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_schocklage"
                                    checked={ischeckedMassnahmen_value[13]}
                                    onChange={() => handleOnChange_massnahmen("Schocklage")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_schocklage">Schocklage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_ruhigstellung"
                                    checked={ischeckedMassnahmen_value[14]}
                                    onChange={() => handleOnChange_massnahmen("Ruhigstellung")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_ruhigstellung">Ruhigstellung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_absicherung"
                                    checked={ischeckedMassnahmen_value[15]}
                                    onChange={() => handleOnChange_massnahmen("Absicherung")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_absicherung">Absicherung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_einweisung_rd"
                                    checked={ischeckedMassnahmen_value[16]}
                                    onChange={() => handleOnChange_massnahmen("Einweisung RD")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_einweisung_rd">Einweisung RD</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_unterstutzung_rd"
                                    checked={ischeckedMassnahmen_value[17]}
                                    onChange={() => handleOnChange_massnahmen("Unterstuetzung RD")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_unterstutzung_rd">Unterstützung RD</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_nnd_abwartend"
                                    checked={ischeckedMassnahmen_value[18]}
                                    onChange={() => handleOnChange_massnahmen("NND abwartend")}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_nnd_abwartend">NND abwartend</label>
                            </div>

                            <input placeholder="Sonstiges" className="massnahmen_einsatzart_body_components_line_right3_sontiges" />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span style={{ color: fontColor[0] }} className="massnahmen_einsatzart_body_components_line_label">
                            Bei AED: Anzahl Schocks:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                value={Anzahl_Schocks}
                                onChange={handleInputChange_Anzahl_Schocks}
                                placeholder="Z.B 2"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span style={{ color: fontColor[1] }} className="massnahmen_einsatzart_body_components_line_label">
                            Bei O2: Gegebene Liter/min:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                value={Gegebene_Liter_min}
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
                                        checked={ischeckedEinsatzart_value[0]}
                                        onChange={() => handleOnChange_einsatzart("Verkehrsunfall")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_verkehrsunfall">Verkehrsunfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_chirurgischer_notfall"
                                        checked={ischeckedEinsatzart_value[1]}
                                        onChange={() => handleOnChange_einsatzart("Chirurgischer Notfall")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_chirurgischer_notfall">Chirurgischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_internistischer_notfall"
                                        checked={ischeckedEinsatzart_value[2]}
                                        onChange={() => handleOnChange_einsatzart("Internistischer Notfall")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_internistischer_notfall">Internistischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect_marking">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_reanimation"
                                        checked={ischeckedEinsatzart_value[3]}
                                        onChange={() => handleOnChange_einsatzart("Reanimation")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_reanimation">Reanimation</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_infektionseinsatz"
                                        checked={ischeckedEinsatzart_value[4]}
                                        onChange={() => handleOnChange_einsatzart("Infektionseinsatz")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_infektionseinsatz">Infektionseinsatz</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_paediatrischer_notfall"
                                        checked={ischeckedEinsatzart_value[5]}
                                        onChange={() => handleOnChange_einsatzart("Paediatrischer Notfall")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_paediatrischer_notfall">Paediatrischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_arbeitsunfall"
                                        checked={ischeckedEinsatzart_value[6]}
                                        onChange={() => handleOnChange_einsatzart("Arbeitsunfall")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_arbeitsunfall">Arbeitsunfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_gynaekologischer_notfall"
                                        checked={ischeckedEinsatzart_value[7]}
                                        onChange={() => handleOnChange_einsatzart("Gynaekologischer Notfall")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_gynaekologischer_notfall">Gynäkologischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_fehleinsatz_siehe_protokoll_fehleinsatz"
                                        checked={ischeckedEinsatzart_value[8]}
                                        onChange={() => handleOnChange_einsatzart("Fehleinsatz ..siehe Protokoll Fehleinsatz..")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_fehleinsatz_siehe_protokoll_fehleinsatz">Fehleinsatz ..siehe Protokoll Fehleinsatz..</label>
                                </div>

                            </div>
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                value={sonstigg}
                                onChange={handleInputChange_sonstigg}
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
                                        checked={Weitere_beteiligte_Einsatzkraefte[0]}
                                        onChange={() => handleOnChange_Weitere_beteiligte_Einsatzkraefte("Feuerwehr")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_feuerwehr">Feuerwehr</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_polizei"
                                        checked={Weitere_beteiligte_Einsatzkraefte[1]}
                                        onChange={() => handleOnChange_Weitere_beteiligte_Einsatzkraefte("Polizei")}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_polizei">Polizei</label>
                                </div>
                            </div>

                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                value={sonstigg2}
                                onChange={handleInputChange_sonstigg2}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span style={{ color: fontColor[2] }} className="massnahmen_einsatzart_body_components_line_label">
                            Übergabe an: *
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                value={Uebergabe_an}
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
                                value={Freitext}
                                onChange={handleInputChange_Freitext}
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