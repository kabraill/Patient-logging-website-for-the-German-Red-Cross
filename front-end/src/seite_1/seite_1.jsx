import "./seite_1.css"

import React, { useState, useEffect, useRef } from "react";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";

import axios from "axios";

import {
    ArrowForwardIos
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";


export default function Seite_1() {
    const navigate = useNavigate();




    const special_marking_name = useRef();
    const special_marking_color = useRef();
    const alarmkey = useRef();
    const auftragsnummer = useRef();
    const checkbox_auftragsnummer = useRef();
    const einsatzort = useRef();
    const alarmzeit = useRef();
    const ankunfthvo = useRef();
    const ankunft_rtw_nef = useRef();
    const einsatzende = useRef();

    const alarmkey_l = useRef();
    const auftragsnummer_l = useRef();
    const alarmzeit_l = useRef();
    const ankunfthvo_l = useRef();
    const einsatzende_l = useRef();

    const pub_token = useRef();
    const pub_draft_protocol_token = useRef();

    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const load_page = async () => {
            //console.log(return_work.current)
            const token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token');
            const isLoggedIn = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn');
            //console.log(token)
            //console.log("load 1 -----------------------------------------------------------------------------------------");
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
                    //console.log("load type decodedToken = 'undefined-----------------------------------------------------------------------------------------");

                    return;
                }
                //console.log(" dec :  " + new Date(decodedToken.exp * 1000))
                //console.log("login page isLoggedIn === 'true' && token")



                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_token', await encodeToken(decodedToken.userId));
                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'true');

                //console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token'));
                //console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn'));
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

                    //console.log("datasssssssssssssssssssssssss : " + datas);


                    if (datas.einsatzdaten.special_marking_name !== null) {
                        special_marking_name.current.value = datas.einsatzdaten.special_marking_name;
                    }

                    if (datas.einsatzdaten.special_marking_color !== null) {
                        special_marking_color.current.value = datas.einsatzdaten.special_marking_color;
                    }

                    if (datas.einsatzdaten.alarmschluessel !== null) {
                        alarmkey.current.value = datas.einsatzdaten.alarmschluessel;
                        if (datas.einsatzdaten.alarmschluessel.match('^[123][0-9]{3}[NBnb]?$')) {
                            alarmkey_l.current.style.color = "black";
                        } else {
                            alarmkey_l.current.style.color = "red";
                        }
                    } else {
                        alarmkey_l.current.style.color = "red";
                    }


                    if (datas.einsatzdaten.keine_auftragnummer !== null) {
                        checkbox_auftragsnummer.current.checked = datas.einsatzdaten.keine_auftragnummer;
                        if (datas.einsatzdaten.keine_auftragnummer === true) {
                            auftragsnummer.current.disabled = true;
                            document.getElementById("s1_keine_nummer").style.background = "rgb(220, 220, 220)";
                        } else {
                            auftragsnummer.current.disabled = false;
                            document.getElementById("s1_keine_nummer").style.background = "rgb(255, 255, 255)";
                        }
                    } else {
                        document.getElementById("s1_keine_nummer").style.background = "rgb(255, 255, 255)";
                    }

                    if (datas.einsatzdaten.auftragsnummer !== null) {
                        auftragsnummer.current.value = datas.einsatzdaten.auftragsnummer;
                        if (datas.einsatzdaten.auftragsnummer.match('^([0-9]+)$')) {
                            auftragsnummer_l.current.style.color = "black";
                        } else {
                            auftragsnummer_l.current.style.color = "red";
                        }
                    } else {
                        auftragsnummer_l.current.style.color = "red";
                    }



                    if (datas.einsatzdaten.einsatzort !== null) {
                        einsatzort.current.value = datas.einsatzdaten.einsatzort;
                    }

                    if (datas.einsatzdaten.alarmzeit !== null) {
                        alarmzeit.current.value = datas.einsatzdaten.alarmzeit;
                        if (datas.einsatzdaten.alarmzeit.match('^[0-9][0-9]:[0-9][0-9]$')) {
                            alarmzeit_l.current.style.color = "black";
                        } else {
                            alarmzeit_l.current.style.color = "red";
                        }
                    } else {
                        alarmzeit_l.current.style.color = "red";
                    }



                    if (datas.einsatzdaten.ankunft_hvo !== null) {
                        ankunfthvo.current.value = datas.einsatzdaten.ankunft_hvo;
                        if (datas.einsatzdaten.ankunft_hvo.match('^[0-9][0-9]:[0-9][0-9]$')) {
                            ankunfthvo_l.current.style.color = "black";
                        } else {
                            ankunfthvo_l.current.style.color = "red";
                        }
                    } else {
                        ankunfthvo_l.current.style.color = "red";
                    }

                    if (datas.einsatzdaten.ankunft_rtw_nef !== null) {
                        ankunft_rtw_nef.current.value = datas.einsatzdaten.ankunft_rtw_nef;
                    }

                    if (datas.einsatzdaten.einsatzende !== null) {
                        einsatzende.current.value = datas.einsatzdaten.einsatzende;
                        if (datas.einsatzdaten.einsatzende.match('^[0-9][0-9]:[0-9][0-9]$')) {
                            einsatzende_l.current.style.color = "black";
                        } else {
                            einsatzende_l.current.style.color = "red";
                        }
                    } else {
                        einsatzende_l.current.style.color = "red";
                    }


                } else {
                    navigate('/einstellungen');
                }
            } else {
                setLoading(false);
                navigate('/');
            }


        };

        //debugger;
        load_page();


    }, []);

    //"#ff0000"
    const save_datas_einsatzdaten = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_einsatzdaten",
                {
                    id: pub_draft_protocol_token.current.obj,
                    instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),
                    special_marking_name_a: special_marking_name.current.value,
                    special_marking_color_a: special_marking_color.current.value,
                    alarmkey_a: alarmkey.current.value,
                    keine_auftragnummer_a: checkbox_auftragsnummer.current.checked,
                    auftragsnummer_a: auftragsnummer.current.value,
                    einsatzort_a: einsatzort.current.value,
                    alarmzeit_a: alarmzeit.current.value,
                    ankunfthvo_a: ankunfthvo.current.value,
                    ankunft_rtw_nef_a: ankunft_rtw_nef.current.value,
                    einsatzende_a: einsatzende.current.value
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
        const nav_next_a = async () => {
            await save_datas_einsatzdaten();

        }
        await nav_next_a();

        navigate('/beteiligte_einsatzkraefte');
    }

    const handleChange_einsatzende = (e) => {

        if (e.target.value.match('^[0-9][0-9]:[0-9][0-9]$')) {
            einsatzende_l.current.style.color = "black";
        } else {
            einsatzende_l.current.style.color = "red";

        }
    }



    const handleChange_ankunfthvo = (e) => {

        if (e.target.value.match('^[0-9][0-9]:[0-9][0-9]$')) {
            ankunfthvo_l.current.style.color = "black";
        } else {
            ankunfthvo_l.current.style.color = "red";
        }
    }

    const handleChange_alarmzeit = (e) => {

        if (e.target.value.match('^[0-9][0-9]:[0-9][0-9]$')) {
            alarmzeit_l.current.style.color = "black";
        } else {
            alarmzeit_l.current.style.color = "red";
        }

    }

    function handleChangeCheckbox(e) {
        if (e.target.checked === true) {
            document.getElementById("s1_keine_nummer").style.background = "rgb(220, 220, 220)";
            auftragsnummer.current.disabled = true;
        } else {
            document.getElementById("s1_keine_nummer").style.background = "rgb(255, 255, 255)";
            auftragsnummer.current.disabled = false;
        }
    }

    function handleChangealarmkey(e) {

        if (e.target.value.match('^[123][0-9]{3}[NBnb]?$')) {
            alarmkey_l.current.style.color = "black";
        } else {
            alarmkey_l.current.style.color = "red";
        }

    }

    function handleChangeAuftragsNummer(e) {

        if (e.target.value.match('^([0-9]+)$')) {
            auftragsnummer_l.current.style.color = "black";

        } else {
            auftragsnummer_l.current.style.color = "red";
        }

    }

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="s1">
            <Sidebar currentPage="einsatzdaten" />
            <Topbar />
            <div className="s1_body">
                <span className="s1_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>);
    }

    return (

        <div className="s1">
            <Sidebar currentPage="einsatzdaten" />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="s1_body">
                <span className="s1_body_title">
                    Einsatzdaten
                </span>
                <div className="s1_body_components">
                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Special Marking:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                ref={special_marking_name}
                                placeholder="Special Marking Name"
                            />

                            <input ref={special_marking_color} type="color" defaultValue="#ff0000" />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line" >
                        <span ref={alarmkey_l} className="s1_body_components_line_label">
                            Alarmschlüssel: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                ref={alarmkey}
                                className="s1_body_components_line_right_txt"
                                onChange={handleChangealarmkey}
                                placeholder="Z.B 1234N"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span ref={auftragsnummer_l} className="s1_body_components_line_label">
                            Auftragsnummer: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                ref={auftragsnummer}
                                className="s1_body_components_line_right_txt"
                                onChange={handleChangeAuftragsNummer}
                                placeholder="Z.B 23"
                            //disabled={isCheckboxChecked}
                            />

                            <input id="einsatzdaten_auftragnummer" ref={checkbox_auftragsnummer} onChange={handleChangeCheckbox} type="checkbox" className="s1_body_components_line_right_nonr" />
                            <label htmlFor="einsatzdaten_auftragnummer" id="s1_keine_nummer" className="s1_body_components_line_right_nonrtxt">
                                Keine Auftragsnummer
                            </label>
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Einsatzort:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                ref={einsatzort}
                                className="s1_body_components_line_right_txt"
                                placeholder="Z.B Ulrich Straße 40"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span ref={alarmzeit_l} className="s1_body_components_line_label">
                            Alarmzeit: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                ref={alarmzeit}
                                className="s1_body_components_line_right_txt"
                                onChange={handleChange_alarmzeit}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span ref={ankunfthvo_l} className="s1_body_components_line_label">
                            Ankunft HvO: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                ref={ankunfthvo}
                                className="s1_body_components_line_right_txt"
                                onChange={handleChange_ankunfthvo}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Ankunft RTW / NEF:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input type="time"
                                ref={ankunft_rtw_nef}
                                className="s1_body_components_line_right_txt"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span ref={einsatzende_l} className="s1_body_components_line_label">
                            Einsatzende: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="time"
                                ref={einsatzende}
                                className="s1_body_components_line_right_txt"
                                onChange={handleChange_einsatzende}
                            />
                        </div>
                    </div>

                </div>

                <div className="s1_body_buttons_special">
                    <button onClick={nav_next} className="s1_body_buttons_btn_next">Nächste<ArrowForwardIos /></button>
                </div>

            </div>
        </div>
    );
}