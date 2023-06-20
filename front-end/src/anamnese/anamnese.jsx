import "./anamnese.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Anamnese() {

    const navigate = useNavigate();
    const [fontcolor, setFontcolor] = useState(["red", "red", "red", "red"]);
    const [page_load, setPage_load] = useState(0);

    const [atemwege, setAtemwege] = useState("");
    const [isChecked_belueftung, setIsChecked_belueftung] = useState([false, false, false, false, false, false, false]);
    const [isChecked_puls, setIsChecked_puls] = useState([false, false, false, false, false]);
    const [isChecked_haut, setIsChecked_haut] = useState([false, false, false, false, false, false]);
    const [SonstigValue, setSonstigValue] = useState("");
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
        navigate('/messwerte');
    }

    const nav_previous = () => {
        navigate('/patient');
    }

    const handleInputChange_SonstigValue = (event) => {
        setSonstigValue(event.target.value);
    }

    function handleOnChange(event) {
        setAtemwege(event.target.value);

        const copy_fontcolor = fontcolor.slice();
        copy_fontcolor[0] = "black";
        setFontcolor(copy_fontcolor);

    }

    function handleOnChange_belueftng(type) {
        if (type === "Unauffaellig") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Zyanose") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Rasseln") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Schnappatmung") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Atemnot") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Hyperventillation") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[5] = !newIsChecked[5];
            setIsChecked_belueftung(newIsChecked);

        } else if (type === "Atemstillstand") {
            const newIsChecked = isChecked_belueftung.slice();
            newIsChecked[6] = !newIsChecked[6];
            setIsChecked_belueftung(newIsChecked);
        }

    }

    useEffect(() => {

        if (page_load == 0) {
            setPage_load(page_load + 1);
        } else {
            const fontcolor_copy = fontcolor.slice();
            if (isChecked_belueftung.includes(true) || SonstigValue !== "") {
                fontcolor_copy[1] = "black"
                setFontcolor(fontcolor_copy);
            } else {
                fontcolor_copy[1] = "red"
                setFontcolor(fontcolor_copy);
            }
        }

    }, [isChecked_belueftung, SonstigValue]);

    function handleOnChange_puls(type) {
        if (type === "Regelmaeßig") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_puls(newIsChecked);

        } else if (type === "Unregelmaeßig") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_puls(newIsChecked);

        } else if (type === "Gut tastbar") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_puls(newIsChecked);
        } else if (type === "Schlecht tastbar") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_puls(newIsChecked);

        } else if (type === "Nicht tastbar") {
            const newIsChecked = isChecked_puls.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_puls(newIsChecked);
        }
    }

    useEffect(() => {
        if (page_load == 0) {
            setPage_load(page_load + 1);
        } else {
            const fontcolor_copy = fontcolor.slice();
            if (!isChecked_puls.includes(true)) {
                fontcolor_copy[2] = "red"
                setFontcolor(fontcolor_copy);
            } else {
                fontcolor_copy[2] = "black"
                setFontcolor(fontcolor_copy);
            }
        }

    }, [isChecked_puls]);

    function handleOnChange_haut(type) {
        if (type === "Rosig") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Blass") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Blau") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Rot") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Warm") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_haut(newIsChecked);

        } else if (type === "Kalt") {
            const newIsChecked = isChecked_haut.slice();
            newIsChecked[5] = !newIsChecked[5];
            setIsChecked_haut(newIsChecked);
        }
    }

    useEffect(() => {
        if (page_load == 0) {
            setPage_load(page_load + 1);
        } else {
            const fontcolor_copy = fontcolor.slice();
            if (!isChecked_haut.includes(true)) {
                fontcolor_copy[3] = "red"
                setFontcolor(fontcolor_copy);
            } else {
                fontcolor_copy[3] = "black"
                setFontcolor(fontcolor_copy);
            }
        }

    }, [isChecked_haut]);

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="anamnese">
            <Sidebar currentPage="anamnese" />
            <Topbar />
            <div className="anamnese_body">
                <span className="anamnese_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="anamnese">
            <Sidebar currentPage="anamnese" />
            <Topbar />

            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="anamnese_body">
                <span className="anamnese_body_title">
                    Anamnese
                </span>
                <div className="anamnese_body_components">
                    <div className="anamnese_body_components_line">
                        <span style={{ color: fontcolor[0] }} className="anamnese_body_components_line_label">
                            Atemwege: *
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    className="anamnese_body_components_line_right3_multiselect_radio"
                                    id="anamnese_atemwege_frei"
                                    type="radio"
                                    name="atemwege"
                                    value="frei"
                                    onClick={handleOnChange}
                                />
                                <label htmlFor="anamnese_atemwege_frei">Frei</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    className="anamnese_body_components_line_right3_multiselect_radio"
                                    id="anamnese_atemwege_verlegt"
                                    type="radio"
                                    name="atemwege"
                                    value="verlegt"
                                    onClick={handleOnChange}
                                />
                                <label htmlFor="anamnese_atemwege_verlegt">Verlegt</label>
                            </div>
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span style={{ color: fontcolor[1] }} className="anamnese_body_components_line_label">
                            Belüftung: *
                        </span>
                        <div className="anamnese_body_components_line_right2">
                            <div className="anamnese_body_components_line_right2_body">
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_unauffaellig"
                                        checked={isChecked_belueftung[0]}
                                        onChange={() => handleOnChange_belueftng("Unauffaellig")}
                                    />
                                    <label htmlFor="anamnese_beluftung_unauffaellig">Unauffällig</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_zyanose"
                                        checked={isChecked_belueftung[1]}
                                        onChange={() => handleOnChange_belueftng("Zyanose")}
                                    />
                                    <label htmlFor="anamnese_beluftung_zyanose">Zyanose</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_rasseln"
                                        checked={isChecked_belueftung[2]}
                                        onChange={() => handleOnChange_belueftng("Rasseln")}
                                    />
                                    <label htmlFor="anamnese_beluftung_rasseln">Rasseln</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_schnappatmung"
                                        checked={isChecked_belueftung[3]}
                                        onChange={() => handleOnChange_belueftng("Schnappatmung")}
                                    />
                                    <label htmlFor="anamnese_beluftung_schnappatmung">Schnappatmung</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_atemnot"
                                        checked={isChecked_belueftung[4]}
                                        onChange={() => handleOnChange_belueftng("Atemnot")}
                                    />
                                    <label htmlFor="anamnese_beluftung_atemnot">Atemnot</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_hyperventillation"
                                        checked={isChecked_belueftung[5]}
                                        onChange={() => handleOnChange_belueftng("Hyperventillation")}
                                    />
                                    <label htmlFor="anamnese_beluftung_hyperventillation">Hyperventillation</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_atemstillstand"
                                        checked={isChecked_belueftung[6]}
                                        onChange={() => handleOnChange_belueftng("Atemstillstand")}
                                    />
                                    <label htmlFor="anamnese_beluftung_atemstillstand">Atemstillstand</label>
                                </div>
                            </div>

                            <input type="text"
                                className="anamnese_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                value={SonstigValue}
                                onChange={handleInputChange_SonstigValue}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span style={{ color: fontcolor[2] }} className="anamnese_body_components_line_label">
                            Puls: *
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_regelmasessig"
                                    checked={isChecked_puls[0]}
                                    onChange={() => handleOnChange_puls("Regelmaeßig")}
                                />
                                <label htmlFor="anamnese_puls_regelmasessig">Regelmäßig</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_unregelmaessig"
                                    checked={isChecked_puls[1]}
                                    onChange={() => handleOnChange_puls("Unregelmaeßig")}
                                />
                                <label htmlFor="anamnese_puls_unregelmaessig">Unregelmäßig</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_gut_tastbar"
                                    checked={isChecked_puls[2]}
                                    onChange={() => handleOnChange_puls("Gut tastbar")}
                                />
                                <label htmlFor="anamnese_puls_gut_tastbar">Gut tastbar</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_schlecht_tastbar"
                                    checked={isChecked_puls[3]}
                                    onChange={() => handleOnChange_puls("Schlecht tastbar")}
                                />
                                <label htmlFor="anamnese_puls_schlecht_tastbar">Schlecht tastbar</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_nicht_tastbar"
                                    checked={isChecked_puls[4]}
                                    onChange={() => handleOnChange_puls("Nicht tastbar")}
                                />
                                <label htmlFor="anamnese_puls_nicht_tastbar">Nicht tastbar</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span style={{ color: fontcolor[3] }} className="anamnese_body_components_line_label">
                            Haut: *
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_rosig"
                                    checked={isChecked_haut[0]}
                                    onChange={() => handleOnChange_haut("Rosig")}
                                />
                                <label htmlFor="anamnese_haut_rosig">Rosig</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_blass"
                                    checked={isChecked_haut[1]}
                                    onChange={() => handleOnChange_haut("Blass")}
                                />
                                <label htmlFor="anamnese_haut_blass">Blass</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_blau"
                                    checked={isChecked_haut[2]}
                                    onChange={() => handleOnChange_haut("Blau")}
                                />
                                <label htmlFor="anamnese_haut_blau">Blau</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_rot"
                                    checked={isChecked_haut[3]}
                                    onChange={() => handleOnChange_haut("Rot")}
                                />
                                <label htmlFor="anamnese_haut_rot">Rot</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_warm"
                                    checked={isChecked_haut[4]}
                                    onChange={() => handleOnChange_haut("Warm")}
                                />
                                <label htmlFor="anamnese_haut_warm">Warm</label>
                            </div>

                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_kalt"
                                    checked={isChecked_haut[5]}
                                    onChange={() => handleOnChange_haut("Kalt")}
                                />
                                <label htmlFor="anamnese_haut_kalt">Kalt</label>
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