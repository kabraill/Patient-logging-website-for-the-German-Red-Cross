import "./massnahmen_einsatzart.css"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";


export default function Massnahmen_einsatzart() {

    const navigate = useNavigate();
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

    const nav_previous = () => {
        navigate('/monitoring');
    }

    const handleInputChange_Freitext = (e) => {
        setFreitext(e.target.value);
    }

    const handleInputChange_Uebergabe_an = (e) => {
        setUebergabe_an(e.target.value);
    }

    const handleInputChange_sonstigg2 = (e) => {
        setSonstigg2(e.target.value);
    }

    const handleInputChange_sonstigg = (e) => {
        setSonstigg(e.target.value);
    }

    const handleInputChange_Anzahl_Schocks = (e) => {
        setAnzahl_Schocks(e.target.value);
        if (e.target.value.match('^([0-9]+)$')) {

        } else {

        }
    }

    const handleInputChange_Gegebene_Liter_min = (e) => {
        setGegebene_Liter_min(e.target.value);
        if (e.target.value.match('^([0-9]+)$')) {

        } else {

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

    return (
        <div className="massnahmen_einsatzart">
            <Sidebar />
            <Topbar />
            <div className="massnahmen_einsatzart_body">
                <span className="massnahmen_einsatzart_body_title">
                    Massnahmen & Einsatzart
                </span>

                <div className="massnahmen_einsatzart_body_components">
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Massnahmen:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right3">
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[0]}
                                    onChange={() => handleOnChange_massnahmen("Atemwege freimachen")}
                                />
                                <span>Atemwege freimachen</span>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[1]}
                                    onChange={() => handleOnChange_massnahmen("Larynxtubus")}
                                />
                                <span>Larynxtubus</span>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[2]}
                                    onChange={() => handleOnChange_massnahmen("O2 Gabe")}
                                />
                                <span>O2 Gabe</span>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[3]}
                                    onChange={() => handleOnChange_massnahmen("Brille/Maske/Beutel")}
                                />
                                <span>Brille/Maske/Beutel</span>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[4]}
                                    onChange={() => handleOnChange_massnahmen("sonstiges ...siehe Text")}
                                />
                                <span>sonstiges ...siehe Text</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[5]}
                                    onChange={() => handleOnChange_massnahmen("Herzdruckmassage")}
                                />
                                <span>Herzdruckmassage</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[6]}
                                    onChange={() => handleOnChange_massnahmen("AED")}
                                />
                                <span>AED</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[7]}
                                    onChange={() => handleOnChange_massnahmen("Wundversorgung")}
                                />
                                <span>Wundversorgung</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[8]}
                                    onChange={() => handleOnChange_massnahmen("HWS Fixierung")}
                                />
                                <span>HWS Fixierung</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[9]}
                                    onChange={() => handleOnChange_massnahmen("NA Nachforderung")}
                                />
                                <span>NA Nachforderung</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[10]}
                                    onChange={() => handleOnChange_massnahmen("Seitenlage")}
                                />
                                <span>Seitenlage</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[11]}
                                    onChange={() => handleOnChange_massnahmen("Oberkoerper hoch/sitzend")}
                                />
                                <span>Oberkörper hoch/sitzend</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[12]}
                                    onChange={() => handleOnChange_massnahmen("Flachlagerung")}
                                />
                                <span>Flachlagerung</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[13]}
                                    onChange={() => handleOnChange_massnahmen("Schocklage")}
                                />
                                <span>Schocklage</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[14]}
                                    onChange={() => handleOnChange_massnahmen("Ruhigstellung")}
                                />
                                <span>Ruhigstellung</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[15]}
                                    onChange={() => handleOnChange_massnahmen("Absicherung")}
                                />
                                <span>Absicherung</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[16]}
                                    onChange={() => handleOnChange_massnahmen("Einweisung RD")}
                                />
                                <span>Einweisung RD</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[17]}
                                    onChange={() => handleOnChange_massnahmen("Unterstuetzung RD")}
                                />
                                <span>Unterstützung RD</span>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={ischeckedMassnahmen_value[18]}
                                    onChange={() => handleOnChange_massnahmen("NND abwartend")}
                                />
                                <span>NND abwartend</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="horizontal-line"></div>
                    
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Bei AED: Anzahl Schocks:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                value={Anzahl_Schocks}
                                onChange={handleInputChange_Anzahl_Schocks}
                                placeholder="Z.B 70"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Bei O2: Gegebene Liter/min:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                value={Gegebene_Liter_min}
                                onChange={handleInputChange_Gegebene_Liter_min}
                                placeholder="Z.B 70"
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
                                        checked={ischeckedEinsatzart_value[0]}
                                        onChange={() => handleOnChange_einsatzart("Verkehrsunfall")}
                                    />
                                    <span>Verkehrsunfall</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={ischeckedEinsatzart_value[1]}
                                        onChange={() => handleOnChange_einsatzart("Chirurgischer Notfall")}
                                    />
                                    <span>Chirurgischer Notfall</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={ischeckedEinsatzart_value[2]}
                                        onChange={() => handleOnChange_einsatzart("Internistischer Notfall")}
                                    />
                                    <span>Internistischer Notfall</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect_marking">
                                    <input
                                        type="checkbox"
                                        checked={ischeckedEinsatzart_value[3]}
                                        onChange={() => handleOnChange_einsatzart("Reanimation")}
                                    />
                                    <span>Reanimation</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={ischeckedEinsatzart_value[4]}
                                        onChange={() => handleOnChange_einsatzart("Infektionseinsatz")}
                                    />
                                    <span>Infektionseinsatz</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={ischeckedEinsatzart_value[5]}
                                        onChange={() => handleOnChange_einsatzart("Paediatrischer Notfall")}
                                    />
                                    <span>Paediatrischer Notfall</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={ischeckedEinsatzart_value[6]}
                                        onChange={() => handleOnChange_einsatzart("Arbeitsunfall")}
                                    />
                                    <span>Arbeitsunfall</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={ischeckedEinsatzart_value[7]}
                                        onChange={() => handleOnChange_einsatzart("Gynaekologischer Notfall")}
                                    />
                                    <span>Gynäkologischer Notfall</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={ischeckedEinsatzart_value[8]}
                                        onChange={() => handleOnChange_einsatzart("Fehleinsatz ..siehe Protokoll Fehleinsatz..")}
                                    />
                                    <span>Fehleinsatz ..siehe Protokoll Fehleinsatz..</span>
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

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Weitere beteiligte Einsatzkräfte:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right4">
                            <div className="massnahmen_einsatzart_body_components_line_right2_body">
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={Weitere_beteiligte_Einsatzkraefte[0]}
                                        onChange={() => handleOnChange_Weitere_beteiligte_Einsatzkraefte("Feuerwehr")}
                                    />
                                    <span>Feuerwehr</span>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        checked={Weitere_beteiligte_Einsatzkraefte[1]}
                                        onChange={() => handleOnChange_Weitere_beteiligte_Einsatzkraefte("Polizei")}
                                    />
                                    <span>Polizei</span>
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

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
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
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                value={Freitext}
                                onChange={handleInputChange_Freitext}
                            />
                        </div>
                    </div>

                </div>

                <div className="s1_body_buttons_special">
                    <button onClick={nav_previous} className="s1_body_buttons_btn_back"><ArrowBackIos />Vorherige</button>
                </div>
            </div>
        </div>
    );
}