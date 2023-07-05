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

    const [datasss, setDatasss] = useState();

    const PulsValue = useRef();
    const BlutdruckValue = useRef();
    const SPo2Value = useRef();
    const KeineMesswerteValue = useRef();

    const PulsValue_l = useRef();
    const BlutdruckValue_l = useRef();
    const SPo2Value_l = useRef();

    const pub_token = useRef();
    const pub_draft_protocol_token = useRef();

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
                const draft_protocol_token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                const draft_protocol_instance = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance');
                //console.log("load before protcol -----------------------------------------------------------------------------------------");
                if (draft_protocol_token && draft_protocol_instance) {

                    const decoded_object_a = await decode_object(draft_protocol_token);
                    pub_draft_protocol_token.current = decoded_object_a;
                    //console.log("pub_draft_protocol_tokennnnnnnnnnnnnnnnnnnnnn obj : " + pub_draft_protocol_token.current)
                    const datas = await get_datas();

                    if (typeof datas === 'undefined') {
                        localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                        localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                        navigate('/einstellungen');
                        return;
                    }
                    setDatasss(datas)

                    console.log("-------//////////////////////////////////////////////////////////////////////");
                    if (datas.messwerte.keine_messwerte !== null) {

                        KeineMesswerteValue.current.checked = datas.messwerte.keine_messwerte;
                        console.log(datas.messwerte.keine_messwerte + "-------------------------------------------------------");
                        if (datas.messwerte.keine_messwerte === true) {
                            document.getElementById("messwerte_keine_messwerte_label").style.background = "rgb(220, 220, 220)";
                            PulsValue.current.disabled = true;
                            BlutdruckValue.current.disabled = true;
                            SPo2Value.current.disabled = true;

                            PulsValue_l.current.style.color = "black";
                            BlutdruckValue_l.current.style.color = "black";
                            SPo2Value_l.current.style.color = "black";

                            if (datas.messwerte.puls !== null) {
                                PulsValue.current.value = datas.messwerte.puls;
                            }

                            if (datas.messwerte.blutdruck !== null) {
                                BlutdruckValue.current.value = datas.messwerte.blutdruck;
                            }

                            if (datas.messwerte.spo2 !== null) {
                                SPo2Value.current.value = datas.messwerte.spo2;
                            }


                        } else {
                            document.getElementById("messwerte_keine_messwerte_label").style.background = "rgb(255, 255, 255)";
                            PulsValue.current.disabled = false;
                            BlutdruckValue.current.disabled = false;
                            SPo2Value.current.disabled = false;

                            if (datas.messwerte.puls !== null) {
                                PulsValue.current.value = datas.messwerte.puls;
                                if (PulsValue.current.value.match("^([0-9]+)$") || PulsValue.current.value === "") {
                                    PulsValue_l.current.style.color = "black";
                                } else {
                                    PulsValue_l.current.style.color = "red";
                                }
                            } else {
                                PulsValue_l.current.style.color = "black";
                            }

                            if (datas.messwerte.blutdruck !== null) {
                                BlutdruckValue.current.value = datas.messwerte.blutdruck;
                                if (BlutdruckValue.current.value.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || BlutdruckValue.current.value === "") {
                                    BlutdruckValue_l.current.style.color = "black";
                                } else {
                                    BlutdruckValue_l.current.style.color = "red";
                                }
                            } else {
                                BlutdruckValue_l.current.style.color = "black";
                            }

                            if (datas.messwerte.spo2 !== null) {
                                SPo2Value.current.value = datas.messwerte.spo2;
                                if (SPo2Value.current.value.match("^([0-9]+)$") || SPo2Value.current.value === "") {
                                    SPo2Value_l.current.style.color = "black";
                                } else {
                                    SPo2Value_l.current.style.color = "red";
                                }
                            } else {
                                SPo2Value_l.current.style.color = "black";
                            }


                        }
                    } else {
                        document.getElementById("messwerte_keine_messwerte_label").style.background = "rgb(255, 255, 255)";

                        if (datas.messwerte.puls !== null) {
                            PulsValue.current.value = datas.messwerte.puls;

                            if (PulsValue.current.value.match("^([0-9]+)$") || PulsValue.current.value === "") {
                                PulsValue_l.current.style.color = "black";
                            } else {
                                PulsValue_l.current.style.color = "red";
                            }
                        } else {
                            PulsValue_l.current.style.color = "black";
                        }

                        if (datas.messwerte.blutdruck !== null) {
                            BlutdruckValue.current.value = datas.messwerte.blutdruck;

                            if (BlutdruckValue.current.value.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || BlutdruckValue.current.value === "") {
                                BlutdruckValue_l.current.style.color = "black";
                            } else {
                                BlutdruckValue_l.current.style.color = "red";
                            }
                        } else {
                            BlutdruckValue_l.current.style.color = "black";
                        }

                        if (datas.messwerte.spo2 !== null) {
                            SPo2Value.current.value = datas.messwerte.spo2;

                            if (SPo2Value.current.value.match("^([0-9]+)$") || SPo2Value.current.value === "") {
                                SPo2Value_l.current.style.color = "black";
                            } else {
                                SPo2Value_l.current.style.color = "red";
                            }
                        } else {
                            SPo2Value_l.current.style.color = "black";
                        }
                    }

                } else {
                    navigate('/einstellungen');
                }
            } else {
                setLoading(false);
                navigate('/');
            }


        };

        fetchData();
    }, []);

    const save_datas_messwerte = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_messwerte",
                {
                    id: pub_draft_protocol_token.current.obj,
                    instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),
                    PulsValue_a: PulsValue.current.value,
                    BlutdruckValue_a: BlutdruckValue.current.value,
                    SPo2Value_a: SPo2Value.current.value,
                    KeineMesswerteValue_a: KeineMesswerteValue.current.checked
                }
            );

            console.log("einsatzdaten : -------------------------------------------------------------------------------------------------------------------" + response.data);
        } catch (error) {
            //console.log(error);
        }
    }

    const decode_object = async (token) => {
        try {
            const response = await axios.post(
                "http://localhost:8800/protocol_draft/decodedObject",
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
    }

    const get_datas = async () => {
        const draft_protocol_id = pub_draft_protocol_token.current.obj;
        const instance = parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance'));
        console.log("draft_pro_id : " + pub_draft_protocol_token.current.obj);
        console.log("instanceid : " + instance);
        try {
            const response = await axios.post(
                "http://localhost:8800/protocol_draft/get_datas",
                {
                    id: draft_protocol_id,
                    instance_index: instance
                }
            );

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

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

    const nav_next = async () => {
        const save = async () => {
            await save_datas_messwerte();
        }
        await save();
        navigate('/neurologie');
    }

    const nav_previous = async () => {
        const save = async () => {
            await save_datas_messwerte();
        }
        await save();
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

        if (event.target.checked === true) {
            document.getElementById("messwerte_keine_messwerte_label").style.background = "rgb(220, 220, 220)";
            PulsValue.current.disabled = true;
            BlutdruckValue.current.disabled = true;
            SPo2Value.current.disabled = true;

            PulsValue_l.current.style.color = "black";
            BlutdruckValue_l.current.style.color = "black";
            SPo2Value_l.current.style.color = "black";

        } else {
            document.getElementById("messwerte_keine_messwerte_label").style.background = "rgb(255, 255, 255)";
            PulsValue.current.disabled = false;
            BlutdruckValue.current.disabled = false;
            SPo2Value.current.disabled = false;

            if (PulsValue.current.value.match("^([0-9]+)$") || PulsValue.current.value === "") {
                PulsValue_l.current.style.color = "black";
            } else {
                PulsValue_l.current.style.color = "red";
            }

            if (BlutdruckValue.current.value.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || BlutdruckValue.current.value === "") {
                BlutdruckValue_l.current.style.color = "black";
            } else {
                BlutdruckValue_l.current.style.color = "red";
            }

            if (SPo2Value.current.value.match("^([0-9]+)$") || SPo2Value.current.value === "") {
                SPo2Value_l.current.style.color = "black";
            } else {
                SPo2Value_l.current.style.color = "red";
            }
        }
    }

    const delete_d = async () => {
        const userResponse = window.confirm("Sind Sie sicher, dass Sie das Protokoll löschen möchten?");

        if (userResponse) {
            const draft_protocol_id = pub_draft_protocol_token.current.obj;
            const instance = parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance'));

            try {
                const response = await axios.post(
                    "http://localhost:8800/protocol_draft/delete",
                    {
                        id: draft_protocol_id,
                        instance_index: instance
                    }
                );

            } catch (error) {
                console.log(error);
            }

            localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
            localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
            console.log("deeeeeeellllllllllllllleeeeeeeeeeeeeeeeeeeeeetttttttteeeeeeeeeeeee");
            navigate('/einstellungen');
        } else {

        }

    };

    const instanz_erstellen = async () => {
        const userResponse = window.confirm("Sind Sie sicher, dass Sie ein neues Instanz erstellen möchten?");

        if (userResponse) {
            const draft_protocol_id = pub_draft_protocol_token.current.obj;
            const instance = parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance'));

            try {
                const response = await axios.post(
                    "http://localhost:8800/protocol_draft/create_instance",
                    {
                        id: draft_protocol_id,
                        instance_index: instance
                    }
                );

                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_instance', response.data.toString());
            } catch (error) {
                console.log(error);
            }

            alert("Sie haben ein neues instanz vom Protokoll erstellt");
        } else {

        }
    };

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
            <Sidebar currentPage="messwerte" save_a={save_datas_messwerte} datas={datasss} 
            del={delete_d} instanz_erstellen={instanz_erstellen}/>
            <Topbar currentPage="messwerte" datas={datasss} />
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
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="messwerte_body_components_line2">
                        <input type="checkbox"
                            id="messwerte_keine_messwerte"
                            ref={KeineMesswerteValue}
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