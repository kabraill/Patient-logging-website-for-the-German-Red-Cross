import "./verletzungen.css"

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Verletzungen() {

    const navigate = useNavigate();
    const [isChecked_Schaedel_Hirn, setIsChecked_Schaedel_Hirn] = useState([false, false, false, false, false]);
    const [isChecked_Gesicht, setIsChecked_Gesicht] = useState([false, false, false, false, false]);
    const [isChecked_HWS, setIsChecked_HWS] = useState([false, false, false, false, false]);
    const [isChecked_Thorax, setIsChecked_Thorax] = useState([false, false, false, false, false]);
    const [isChecked_Abdomen, setIsChecked_Abdomen] = useState([false, false, false, false, false]);
    const [isChecked_BWS_LWS, setIsChecked_BWS_LWS] = useState([false, false, false, false, false]);
    const [isChecked_Becken, setIsChecked_Becken] = useState([false, false, false, false, false]);
    const [isChecked_Obere_Extremitaeten, setIsChecked_Obere_Extremitaeten] = useState([false, false, false, false, false]);
    const [isChecked_Untere_Extremitaeten, setIsChecked_Untere_Extremitaeten] = useState([false, false, false, false, false]);
    const [isChecked_Weichteile, setIsChecked_Weichteile] = useState([false, false, false, false, false]);


    const nav_next = () => {
        navigate('/monitoring');
    }

    const nav_previous = () => {
        navigate('/neurologie');
    }

    function handleOnChange_Schaedel_Hirn(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_Schaedel_Hirn.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_Schaedel_Hirn(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_Schaedel_Hirn.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_Schaedel_Hirn(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_Schaedel_Hirn.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_Schaedel_Hirn(newIsChecked);
        } else if (type === "Mittel") {
            const newIsChecked = isChecked_Schaedel_Hirn.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_Schaedel_Hirn(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_Schaedel_Hirn.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_Schaedel_Hirn(newIsChecked);
        }
    }

    function handleOnChange_Gesicht(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_Gesicht.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_Gesicht(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_Gesicht.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_Gesicht(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_Gesicht.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_Gesicht(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_Gesicht.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_Gesicht(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_Gesicht.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_Gesicht(newIsChecked);
        }
    }

    function handleOnChange_HWS(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_HWS.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_HWS(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_HWS.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_HWS(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_HWS.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_HWS(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_HWS.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_HWS(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_HWS.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_HWS(newIsChecked);
        }
    }

    function handleOnChange_Thorax(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_Thorax.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_Thorax(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_Thorax.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_Thorax(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_Thorax.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_Thorax(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_Thorax.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_Thorax(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_Thorax.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_Thorax(newIsChecked);
        }
    }

    function handleOnChange_Abdomen(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_Abdomen.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_Abdomen(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_Abdomen.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_Abdomen(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_Abdomen.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_Abdomen(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_Abdomen.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_Abdomen(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_Abdomen.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_Abdomen(newIsChecked);
        }
    }

    function handleOnChange_BWS_LWS(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_BWS_LWS.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_BWS_LWS(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_BWS_LWS.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_BWS_LWS(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_BWS_LWS.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_BWS_LWS(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_BWS_LWS.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_BWS_LWS(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_BWS_LWS.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_BWS_LWS(newIsChecked);
        }
    }

    function handleOnChange_Becken(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_Becken.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_Becken(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_Becken.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_Becken(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_Becken.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_Becken(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_Becken.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_Becken(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_Becken.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_Becken(newIsChecked);
        }
    }


    function handleOnChange_Obere_Extremitaeten(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_Obere_Extremitaeten.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_Obere_Extremitaeten(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_Obere_Extremitaeten.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_Obere_Extremitaeten(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_Obere_Extremitaeten.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_Obere_Extremitaeten(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_Obere_Extremitaeten.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_Obere_Extremitaeten(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_Obere_Extremitaeten.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_Obere_Extremitaeten(newIsChecked);
        }
    }

    function handleOnChange_Untere_Extremitaeten(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_Untere_Extremitaeten.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_Untere_Extremitaeten(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_Untere_Extremitaeten.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_Untere_Extremitaeten(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_Untere_Extremitaeten.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_Untere_Extremitaeten(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_Untere_Extremitaeten.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_Untere_Extremitaeten(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_Untere_Extremitaeten.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_Untere_Extremitaeten(newIsChecked);
        }
    }

    function handleOnChange_Weichteile(type) {
        if (type === "Offen") {
            const newIsChecked = isChecked_Weichteile.slice();
            newIsChecked[0] = !newIsChecked[0];
            setIsChecked_Weichteile(newIsChecked);

        } else if (type === "Geschlossen") {
            const newIsChecked = isChecked_Weichteile.slice();
            newIsChecked[1] = !newIsChecked[1];
            setIsChecked_Weichteile(newIsChecked);

        } else if (type === "Leicht") {
            const newIsChecked = isChecked_Weichteile.slice();
            newIsChecked[2] = !newIsChecked[2];
            setIsChecked_Weichteile(newIsChecked);

        } else if (type === "Mittel") {
            const newIsChecked = isChecked_Weichteile.slice();
            newIsChecked[3] = !newIsChecked[3];
            setIsChecked_Weichteile(newIsChecked);

        } else if (type === "Schwer") {
            const newIsChecked = isChecked_Weichteile.slice();
            newIsChecked[4] = !newIsChecked[4];
            setIsChecked_Weichteile(newIsChecked);
        }
    }

    return (
        <div className="verletzungen">
            <Sidebar currentPage="verletzungen"/>
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
                                    checked={isChecked_Schaedel_Hirn[0]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Offen")}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_geschlossen"
                                    checked={isChecked_Schaedel_Hirn[1]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_leicht"
                                    checked={isChecked_Schaedel_Hirn[2]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Leicht")}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_mittel"
                                    checked={isChecked_Schaedel_Hirn[3]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Mittel")}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_schwer"
                                    checked={isChecked_Schaedel_Hirn[4]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Schwer")}
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
                                    checked={isChecked_Gesicht[0]}
                                    onChange={() => handleOnChange_Gesicht("Offen")}
                                />
                                <label htmlFor="verletzungen_gesicht_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_geschlossen"
                                    checked={isChecked_Gesicht[1]}
                                    onChange={() => handleOnChange_Gesicht("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_gesicht_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_leicht"
                                    checked={isChecked_Gesicht[2]}
                                    onChange={() => handleOnChange_Gesicht("Leicht")}
                                />
                                <label htmlFor="verletzungen_gesicht_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_mittel"
                                    checked={isChecked_Gesicht[3]}
                                    onChange={() => handleOnChange_Gesicht("Mittel")}
                                />
                                <label htmlFor="verletzungen_gesicht_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_schwer"
                                    checked={isChecked_Gesicht[4]}
                                    onChange={() => handleOnChange_Gesicht("Schwer")}
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
                                    checked={isChecked_HWS[0]}
                                    onChange={() => handleOnChange_HWS("Offen")}
                                />
                                <label htmlFor="verletzungen_hws_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_geschlossen"
                                    checked={isChecked_HWS[1]}
                                    onChange={() => handleOnChange_HWS("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_hws_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_leicht"
                                    checked={isChecked_HWS[2]}
                                    onChange={() => handleOnChange_HWS("Leicht")}
                                />
                                <label htmlFor="verletzungen_hws_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_mittel"
                                    checked={isChecked_HWS[3]}
                                    onChange={() => handleOnChange_HWS("Mittel")}
                                />
                                <label htmlFor="verletzungen_hws_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_schwer"
                                    checked={isChecked_HWS[4]}
                                    onChange={() => handleOnChange_HWS("Schwer")}
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
                                    checked={isChecked_Thorax[0]}
                                    onChange={() => handleOnChange_Thorax("Offen")}
                                />
                                <label htmlFor="verletzungen_thorax_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_geschlossen"
                                    checked={isChecked_Thorax[1]}
                                    onChange={() => handleOnChange_Thorax("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_thorax_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_leicht"
                                    checked={isChecked_Thorax[2]}
                                    onChange={() => handleOnChange_Thorax("Leicht")}
                                />
                                <label htmlFor="verletzungen_thorax_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_mittel"
                                    checked={isChecked_Thorax[3]}
                                    onChange={() => handleOnChange_Thorax("Mittel")}
                                />
                                <label htmlFor="verletzungen_thorax_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_schwer"
                                    checked={isChecked_Thorax[4]}
                                    onChange={() => handleOnChange_Thorax("Schwer")}
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
                                    checked={isChecked_Abdomen[0]}
                                    onChange={() => handleOnChange_Abdomen("Offen")}
                                />
                                <label htmlFor="verletzungen_abdomen_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_geschlossen"
                                    checked={isChecked_Abdomen[1]}
                                    onChange={() => handleOnChange_Abdomen("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_abdomen_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_leicht"
                                    checked={isChecked_Abdomen[2]}
                                    onChange={() => handleOnChange_Abdomen("Leicht")}
                                />
                                <label htmlFor="verletzungen_abdomen_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_mittel"
                                    checked={isChecked_Abdomen[3]}
                                    onChange={() => handleOnChange_Abdomen("Mittel")}
                                />
                                <label htmlFor="verletzungen_abdomen_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_schwer"
                                    checked={isChecked_Abdomen[4]}
                                    onChange={() => handleOnChange_Abdomen("Schwer")}
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
                                    checked={isChecked_BWS_LWS[0]}
                                    onChange={() => handleOnChange_BWS_LWS("Offen")}
                                />
                                <label htmlFor="verletzungen_bws_lws_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_geschlossen"
                                    checked={isChecked_BWS_LWS[1]}
                                    onChange={() => handleOnChange_BWS_LWS("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_bws_lws_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_leicht"
                                    checked={isChecked_BWS_LWS[2]}
                                    onChange={() => handleOnChange_BWS_LWS("Leicht")}
                                />
                                <label htmlFor="verletzungen_bws_lws_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_mittel"
                                    checked={isChecked_BWS_LWS[3]}
                                    onChange={() => handleOnChange_BWS_LWS("Mittel")}
                                />
                                <label htmlFor="verletzungen_bws_lws_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_schwer"
                                    checked={isChecked_BWS_LWS[4]}
                                    onChange={() => handleOnChange_BWS_LWS("Schwer")}
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
                                    checked={isChecked_Becken[0]}
                                    onChange={() => handleOnChange_Becken("Offen")}
                                />
                                <label htmlFor="verletzungen_becken_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_geschlossen"
                                    checked={isChecked_Becken[1]}
                                    onChange={() => handleOnChange_Becken("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_becken_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_leicht"
                                    checked={isChecked_Becken[2]}
                                    onChange={() => handleOnChange_Becken("Leicht")}
                                />
                                <label htmlFor="verletzungen_becken_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_mittel"
                                    checked={isChecked_Becken[3]}
                                    onChange={() => handleOnChange_Becken("Mittel")}
                                />
                                <label htmlFor="verletzungen_becken_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_schwer"
                                    checked={isChecked_Becken[4]}
                                    onChange={() => handleOnChange_Becken("Schwer")}
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
                                    checked={isChecked_Obere_Extremitaeten[0]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Offen")}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_geschlossen"
                                    checked={isChecked_Obere_Extremitaeten[1]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_leicht"
                                    checked={isChecked_Obere_Extremitaeten[2]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Leicht")}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_mittel"
                                    checked={isChecked_Obere_Extremitaeten[3]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Mittel")}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_schwer"
                                    checked={isChecked_Obere_Extremitaeten[4]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Schwer")}
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
                                    checked={isChecked_Untere_Extremitaeten[0]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Offen")}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_geschlossen"
                                    checked={isChecked_Untere_Extremitaeten[1]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_leicht"
                                    checked={isChecked_Untere_Extremitaeten[2]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Leicht")}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_mittel"
                                    checked={isChecked_Untere_Extremitaeten[3]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Mittel")}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_schwer"
                                    checked={isChecked_Untere_Extremitaeten[4]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Schwer")}
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
                                    checked={isChecked_Weichteile[0]}
                                    onChange={() => handleOnChange_Weichteile("Offen")}
                                />
                                <label htmlFor="verletzungen_weichteile_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_geschlossen"
                                    checked={isChecked_Weichteile[1]}
                                    onChange={() => handleOnChange_Weichteile("Geschlossen")}
                                />
                                <label htmlFor="verletzungen_weichteile_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_leicht"
                                    checked={isChecked_Weichteile[2]}
                                    onChange={() => handleOnChange_Weichteile("Leicht")}
                                />
                                <label htmlFor="verletzungen_weichteile_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_mittel"
                                    checked={isChecked_Weichteile[3]}
                                    onChange={() => handleOnChange_Weichteile("Mittel")}
                                />
                                <label htmlFor="verletzungen_weichteile_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_schwer"
                                    checked={isChecked_Weichteile[4]}
                                    onChange={() => handleOnChange_Weichteile("Schwer")}
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