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

    const [datasss, setDatasss] = useState();

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

                    navigate('/');
                    return;
                }
                console.log(" dec :  " + new Date(decodedToken.exp * 1000))
                console.log("login page isLoggedIn === 'true' && token")



                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_token', await encodeToken(decodedToken.userId));
                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'true');

                console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token'));
                console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn'));

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

                    setDatasss(datas);
                    console.log("datasssssssssssssssssssssssss : " + datas);

                    if (datas.monitoring.zeit_1 !== null) {
                        zeit_1.current.value = datas.monitoring.zeit_1;
                    }

                    if (datas.monitoring.puls_1 !== null) {
                        puls_1.current.value = datas.monitoring.puls_1;

                        if (puls_1.current.value.match('^([0-9]+)$') || puls_1.current.value === "") {
                            puls_1_l.current.style.color = "black";
                        } else {
                            puls_1_l.current.style.color = "red";
                        }
                    } else {
                        puls_1_l.current.style.color = "black";
                    }

                    if (datas.monitoring.blutdruck_1 !== null) {
                        blutdruck_1.current.value = datas.monitoring.blutdruck_1;

                        if (blutdruck_1.current.value.match('^[0-9]{1,3}\\/[0-9]{1,3}$') || blutdruck_1.current.value === "") {
                            blutdruck_1_l.current.style.color = "black";
                        } else {
                            blutdruck_1_l.current.style.color = "red";
                        }
                    } else {
                        blutdruck_1_l.current.style.color = "black";
                    }

                    if (datas.monitoring.spo2_1 !== null) {
                        SpO2_1.current.value = datas.monitoring.spo2_1;

                        if (SpO2_1.current.value.match('^([0-9]+)$') || SpO2_1.current.value === "") {
                            SpO2_1_l.current.style.color = "black";
                        } else {
                            SpO2_1_l.current.style.color = "red";
                        }
                    } else {
                        SpO2_1_l.current.style.color = "black";
                    }

                    ////////////////////////////////////////////////

                    if (datas.monitoring.zeit_2 !== null) {
                        zeit_2.current.value = datas.monitoring.zeit_2;
                    }

                    if (datas.monitoring.puls_2 !== null) {
                        puls_2.current.value = datas.monitoring.puls_2;

                        if (puls_2.current.value.match('^([0-9]+)$') || puls_2.current.value === "") {
                            puls_2_l.current.style.color = "black";
                        } else {
                            puls_2_l.current.style.color = "red";
                        }
                    } else {
                        puls_2_l.current.style.color = "black";
                    }

                    if (datas.monitoring.blutdruck_2 !== null) {
                        blutdruck_2.current.value = datas.monitoring.blutdruck_2;

                        if (blutdruck_2.current.value.match('^[0-9]{1,3}\\/[0-9]{1,3}$') || blutdruck_2.current.value === "") {
                            blutdruck_2_l.current.style.color = "black";
                        } else {
                            blutdruck_2_l.current.style.color = "red";
                        }
                    } else {
                        blutdruck_2_l.current.style.color = "black";
                    }

                    if (datas.monitoring.spo2_2 !== null) {
                        SpO2_2.current.value = datas.monitoring.spo2_2;

                        if (SpO2_2.current.value.match('^([0-9]+)$') || SpO2_2.current.value === "") {
                            SpO2_2_l.current.style.color = "black";
                        } else {
                            SpO2_2_l.current.style.color = "red";
                        }
                    } else {
                        SpO2_2_l.current.style.color = "black";
                    }

                    document.getElementById("main").style.pointerEvents = "auto"
                } else {
                    navigate('/einstellungen');
                }
            } else {

                navigate('/');
            }


        };
        fetchData();

        const handleBeforeUnload = (e) => {

            e.preventDefault();
            e.returnValue = ''; // Display a confirmation message

        };

        // Add the event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const save_datas_monitoring = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_monitoring",
                {
                    id: pub_draft_protocol_token.current.obj,
                    instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),

                    zeit_1_a: zeit_1.current.value,
                    puls_1_a: puls_1.current.value.trim(),
                    blutdruck_1_a: blutdruck_1.current.value.trim(),
                    SpO2_1_a: SpO2_1.current.value.trim(),

                    zeit_2_a: zeit_2.current.value,
                    puls_2_a: puls_2.current.value.trim(),
                    blutdruck_2_a: blutdruck_2.current.value.trim(),
                    SpO2_2_a: SpO2_2.current.value.trim(),
                }
            );

            if (response.data === "Protocol nicht gefunden") {
                alert("Protocol nicht gefunden");
                localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                navigate('/einstellungen');
                return;
            }

            console.log("beteiligte_einsatzkraefte : -------------------------------------------------------------------------------------------------------------------" + response.data);
        } catch (error) {
            console.log(error);
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

            if (response.data === "Protocol nicht gefunden") {
                alert("Protocol nicht gefunden");
                localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                navigate('/einstellungen');
                return;
            }

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
            await save_datas_monitoring();
        }
        await save();
        navigate('/massnahmen_einsatzart');
    }

    const nav_previous = async () => {
        const save = async () => {
            await save_datas_monitoring();
        }
        await save();
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

                if (response.data === "Protokoll nicht gefunden") {
                    alert("Protocol nicht gefunden");
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                    navigate('/einstellungen');
                    return;
                }

                if (response.data === "Falsche Instanznummer!!") {
                    alert("Falsche Instanznummer!!");
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                    navigate('/einstellungen');
                    return;
                }

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

    const getTimeFromServer = async () => {
        try {
            const response = await axios.get("http://localhost:8800/protocol_draft/time");
            const t = new Date(response.data)
            console.log(t + "    server time");

            return t;
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const instanz_erstellen = async () => {

        const creation_datee = await getTimeFromServer();
        const del_time = new Date(creation_datee);
        del_time.setMonth(del_time.getMonth() + 2);

        const userResponse = window.confirm("Sind Sie sicher, dass Sie ein neues Instanz erstellen möchten?");

        if (userResponse) {
            const draft_protocol_id = pub_draft_protocol_token.current.obj;
            const instance = parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance'));

            try {
                const response = await axios.post(
                    "http://localhost:8800/protocol_draft/create_instance",
                    {
                        id: draft_protocol_id,
                        user_id: pub_token.current.userId,
                        instance_index: instance,
                        creation_dat: creation_datee,
                        delete_timee: del_time
                    }
                );

                if (response.data === "Protocol nicht gefunden") {
                    alert("Protocol nicht gefunden");
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                    navigate('/einstellungen');
                    return;
                }

                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_instance', response.data.toString());

            } catch (error) {
                console.log(error);
            }

            alert("Sie haben ein neues instanz vom Protokoll erstellt");
        } else {

        }
    };

    return (
        <div id="main" style={{ pointerEvents: "none" }} className="monitoring">
            <Sidebar currentPage="monitoring" save_a={save_datas_monitoring} datas={datasss}
                del={delete_d} instanz_erstellen={instanz_erstellen} />
            <Topbar currentPage="monitoring" datas={datasss} />

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