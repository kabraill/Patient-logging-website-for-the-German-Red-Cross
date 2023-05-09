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
            <Sidebar />
            <Topbar />
            <div className="verletzungen_body">
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
                                    checked={isChecked_Schaedel_Hirn[0]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Schaedel_Hirn[1]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Schaedel_Hirn[2]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Schaedel_Hirn[3]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Schaedel_Hirn[4]}
                                    onChange={() => handleOnChange_Schaedel_Hirn("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_Gesicht[0]}
                                    onChange={() => handleOnChange_Gesicht("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Gesicht[1]}
                                    onChange={() => handleOnChange_Gesicht("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Gesicht[2]}
                                    onChange={() => handleOnChange_Gesicht("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Gesicht[3]}
                                    onChange={() => handleOnChange_Gesicht("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Gesicht[4]}
                                    onChange={() => handleOnChange_Gesicht("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_HWS[0]}
                                    onChange={() => handleOnChange_HWS("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_HWS[1]}
                                    onChange={() => handleOnChange_HWS("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_HWS[2]}
                                    onChange={() => handleOnChange_HWS("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_HWS[3]}
                                    onChange={() => handleOnChange_HWS("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_HWS[4]}
                                    onChange={() => handleOnChange_HWS("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_Thorax[0]}
                                    onChange={() => handleOnChange_Thorax("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Thorax[1]}
                                    onChange={() => handleOnChange_Thorax("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Thorax[2]}
                                    onChange={() => handleOnChange_Thorax("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Thorax[3]}
                                    onChange={() => handleOnChange_Thorax("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Thorax[4]}
                                    onChange={() => handleOnChange_Thorax("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_Abdomen[0]}
                                    onChange={() => handleOnChange_Abdomen("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Abdomen[1]}
                                    onChange={() => handleOnChange_Abdomen("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Abdomen[2]}
                                    onChange={() => handleOnChange_Abdomen("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Abdomen[3]}
                                    onChange={() => handleOnChange_Abdomen("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Abdomen[4]}
                                    onChange={() => handleOnChange_Abdomen("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_BWS_LWS[0]}
                                    onChange={() => handleOnChange_BWS_LWS("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_BWS_LWS[1]}
                                    onChange={() => handleOnChange_BWS_LWS("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_BWS_LWS[2]}
                                    onChange={() => handleOnChange_BWS_LWS("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_BWS_LWS[3]}
                                    onChange={() => handleOnChange_BWS_LWS("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_BWS_LWS[4]}
                                    onChange={() => handleOnChange_BWS_LWS("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_Becken[0]}
                                    onChange={() => handleOnChange_Becken("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Becken[1]}
                                    onChange={() => handleOnChange_Becken("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Becken[2]}
                                    onChange={() => handleOnChange_Becken("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Becken[3]}
                                    onChange={() => handleOnChange_Becken("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Becken[4]}
                                    onChange={() => handleOnChange_Becken("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_Obere_Extremitaeten[0]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Obere_Extremitaeten[1]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Obere_Extremitaeten[2]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Obere_Extremitaeten[3]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Obere_Extremitaeten[4]}
                                    onChange={() => handleOnChange_Obere_Extremitaeten("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_Untere_Extremitaeten[0]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Untere_Extremitaeten[1]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Untere_Extremitaeten[2]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Untere_Extremitaeten[3]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Untere_Extremitaeten[4]}
                                    onChange={() => handleOnChange_Untere_Extremitaeten("Schwer")}
                                />
                                <span>Schwer</span>
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
                                    checked={isChecked_Weichteile[0]}
                                    onChange={() => handleOnChange_Weichteile("Offen")}
                                />
                                <span>Offen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Weichteile[1]}
                                    onChange={() => handleOnChange_Weichteile("Geschlossen")}
                                />
                                <span>Geschlossen</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Weichteile[2]}
                                    onChange={() => handleOnChange_Weichteile("Leicht")}
                                />
                                <span>Leicht</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Weichteile[3]}
                                    onChange={() => handleOnChange_Weichteile("Mittel")}
                                />
                                <span>Mittel</span>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    checked={isChecked_Weichteile[4]}
                                    onChange={() => handleOnChange_Weichteile("Schwer")}
                                />
                                <span>Schwer</span>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="s1_body_buttons">
                    <button onClick={nav_previous} className="s1_body_buttons_btn_back"><ArrowBackIos />Vorherige</button>
                    <button onClick={nav_next} className="s1_body_buttons_btn_next">nächste<ArrowForwardIos /></button>
                </div>
            </div>
        </div>
    );
}