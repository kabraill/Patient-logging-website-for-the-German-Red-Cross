import "./Patient.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";

import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Patient() {

    const navigate = useNavigate();

    const [datasss, setDatasss] = useState();

    const gender = useRef("unbekannt");
    const alter = useRef("");

    const gender_l = useRef();
    const alter_l = useRef();

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
                    console.log("datasssssssssssssssssssssssss : " + datas);
                    setDatasss(datas);
                    if (datas.patient.geschlecht !== null) {
                        gender.current.value = datas.patient.geschlecht;

                        if (datas.patient.geschlecht === "unbekannt") {
                            gender_l.current.style.color = "red";
                        } else {
                            gender_l.current.style.color = "black";
                        }
                    } else {
                        gender_l.current.style.color = "red";
                    }

                    if (datas.patient.alter !== null) {
                        alter.current.value = datas.patient.alter;

                        if (datas.patient.alter.match('^([0-9]+)$')) {
                            alter_l.current.style.color = "black";
                        } else {
                            alter_l.current.style.color = "red";
                        }
                    } else {
                        alter_l.current.style.color = "red";
                    }

                    document.getElementById("main").style.pointerEvents = "auto";

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



    const save_datas_patient = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_patient",
                {
                    id: pub_draft_protocol_token.current.obj,
                    instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),
                    geschlecht_a: gender.current.value,
                    alter_a: alter.current.value.trim()
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
            await save_datas_patient();
        }
        await save();
        navigate('/anamnese');
    }

    const nav_previous = async () => {
        const save = async () => {
            await save_datas_patient();
        }
        await save();
        navigate('/beteiligte_einsatzkraefte');
    }

    function handleOnChange(e) {

        if (e.target.value === "unbekannt") {
            gender_l.current.style.color = "red";
        } else {
            gender_l.current.style.color = "black";
        }
    }

    function handleChangeAlter(e) {
        if (e.target.value.match('^([0-9]+)$')) {
            alter_l.current.style.color = "black";
        } else {
            alter_l.current.style.color = "red";
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
        <div id="main" style={{ pointerEvents: "none" }} className="patient">
            <Sidebar currentPage="patient" save_a={save_datas_patient} datas={datasss}
                del={delete_d} instanz_erstellen={instanz_erstellen} />
            <Topbar currentPage="patient" datas={datasss} />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="patient_body">
                <span className="patient_body_title">
                    Patient
                </span>

                <div className="patient_body_components">
                    <div className="patient_body_components_line">

                        <span ref={gender_l} className="patient_body_components_line_label">
                            Geschlecht: *
                        </span>
                        <div className="patient_body_components_line_right">
                            <select ref={gender}
                                onChange={handleOnChange} id="select_custom" className="patient_body_components_line_right_dropdown">
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="unbekannt">unbekannt</option>
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="maennlich">männlich</option>
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="weiblich">weiblich</option>
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="sonstiges">sonstiges</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="patient_body_components_line">
                        <span ref={alter_l} className="patient_body_components_line_label">
                            Alter: *
                        </span>
                        <div className="patient_body_components_line_right">
                            <input required type="text"
                                className="patient_body_components_line_right_txt"
                                ref={alter}
                                onChange={handleChangeAlter}
                                placeholder="Z.B 60"
                                title="Alter"
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