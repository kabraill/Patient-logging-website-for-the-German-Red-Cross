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

    const [datasss, setDatasss] = useState();

    const finished = useRef();
    const protokoll_id = useRef();
    const instance_id = useRef();
    const benutzer_name = useRef();
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

    const finished_l = useRef();
    const alarmkey_l = useRef();
    const auftragsnummer_l = useRef();
    const alarmzeit_l = useRef();
    const ankunfthvo_l = useRef();
    const einsatzende_l = useRef();

    const pub_token = useRef();
    const pub_draft_protocol_token = useRef();
    const user_u = useRef();

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
                user_u.current = await get_user(decodedToken.userId)
                pub_token.current = decodedToken;
                if (typeof decodedToken === 'undefined') {
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_token');
                    localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'false');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                    navigate('/');
                    return;
                }
                //console.log(" dec :  " + new Date(decodedToken.exp * 1000))
                //console.log("login page isLoggedIn === 'true' && token")
                console.log(pub_token.current)


                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_token', await encodeToken(decodedToken.userId));
                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'true');

                //console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token'));
                //console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn'));

                // Update loading state


                const draft_protocol_token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                const draft_protocol_instance = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance');

                //console.log("load before protcol -----------------------------------------------------------------------------------------");
                if (draft_protocol_token && draft_protocol_instance) {


                    const decoded_object_a = await decode_object(draft_protocol_token);

                    pub_draft_protocol_token.current = decoded_object_a;
                    console.log("pub_draft_protocol_tokennnnnnnnnnnnnnnnnnnnnn obj : " + pub_draft_protocol_token.current)

                    const datas = await get_datas();


                    if (typeof datas === 'undefined') {
                        localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                        localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                        navigate('/einstellungen');
                        return;
                    }

                    setDatasss(datas);
                    console.log("datasssssssssssssssssssssssss : " + datas);
                    if (datas._id !== null) {
                        protokoll_id.current.value = pub_draft_protocol_token.current.obj;
                    }

                    instance_id.current.value = draft_protocol_instance;

                    benutzer_name.current.value = user_u.current.name;

                    finished.current.value = datas.finished;

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
                            auftragsnummer_l.current.style.color = "black";
                            document.getElementById("s1_keine_nummer").style.background = "rgb(220, 220, 220)";

                            if (datas.einsatzdaten.auftragsnummer !== null) {
                                auftragsnummer.current.value = datas.einsatzdaten.auftragsnummer;
                            }
                        } else {
                            auftragsnummer.current.disabled = false;
                            document.getElementById("s1_keine_nummer").style.background = "rgb(255, 255, 255)";
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
                        }
                    } else {
                        document.getElementById("s1_keine_nummer").style.background = "rgb(255, 255, 255)";
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
                    }





                    if (datas.einsatzdaten.einsatzort !== null) {
                        einsatzort.current.value = datas.einsatzdaten.einsatzort;
                    }

                    if (datas.einsatzdaten.alarmzeit !== null) {
                        alarmzeit.current.value = datas.einsatzdaten.alarmzeit;
                        if (datas.einsatzdaten.alarmzeit.match(/^(000[1-9]|00[1-9]\d|0[1-9]\d\d|100\d|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|[1-9]\d{4}|1\d{5}|2[0-6]\d{4}|27[0-4]\d{3}|275[0-6]\d{2}|2757[0-5]\d|275760)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])T(0\d|1\d|2[0-4]):(0\d|[1-5]\d)(?::(0\d|[1-5]\d))?(?:.(00\d|0[1-9]\d|[1-9]\d{2}))?$/gm)) {
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

                    document.getElementById("main").style.pointerEvents = "auto";

                    if(user_u.current.permission[0] !== "Normaler-Benutzer"){
                        finished.current.disabled = false;
                    }



                } else {
                    navigate('/einstellungen');
                }
            } else {
                navigate('/');
            }


        };

        //debugger;
        load_page();


    }, []);

    const get_user = async (token) => {

        try {
            const response = await axios.post(
                "http://localhost:8800/user/get_user",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (typeof (response.data) === "string") {
                navigate('/');
                alert(response.data)
            } else {
                return response.data;
            }


        } catch (error) {
            console.log(error);
        }
    };

    //"#ff0000"
    const save_datas_einsatzdaten = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_einsatzdaten",
                {
                    finished: finished.current.value,
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
        if (e.target.value.match(/^(000[1-9]|00[1-9]\d|0[1-9]\d\d|100\d|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|[1-9]\d{4}|1\d{5}|2[0-6]\d{4}|27[0-4]\d{3}|275[0-6]\d{2}|2757[0-5]\d|275760)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])T(0\d|1\d|2[0-4]):(0\d|[1-5]\d)(?::(0\d|[1-5]\d))?(?:.(00\d|0[1-9]\d|[1-9]\d{2}))?$/gm)) {
            alarmzeit_l.current.style.color = "black";
        } else {
            alarmzeit_l.current.style.color = "red";
        }
    }


    function handleChangeCheckbox(e) {
        if (e.target.checked === true) {
            document.getElementById("s1_keine_nummer").style.background = "rgb(220, 220, 220)";
            auftragsnummer.current.disabled = true;
            auftragsnummer_l.current.style.color = "black";
        } else {
            document.getElementById("s1_keine_nummer").style.background = "rgb(255, 255, 255)";
            auftragsnummer.current.disabled = false;

            if (auftragsnummer.current.value.match('^([0-9]+)$')) {
                auftragsnummer_l.current.style.color = "black";
            } else {
                auftragsnummer_l.current.style.color = "red";
            }

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

    function kopieren_id() {
        navigator.clipboard.writeText(protokoll_id.current.value);
    }

    function kopieren_instance() {
        navigator.clipboard.writeText(instance_id.current.value);
    }

    function kopieren_benutzer_name() {
        navigator.clipboard.writeText(benutzer_name.current.value);
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

                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_instance', response.data.toString());

            } catch (error) {
                console.log(error);
            }

            alert("Sie haben ein neues instanz vom Protokoll erstellt");
        } else {

        }
    };

    function handleOnChange(e) {

        if (e.target.value === "nein") {
            finished_l.current.style.color = "red";
        } else {
            finished_l.current.style.color = "black";
        }
    }

    return (

        <div id="main" style={{ pointerEvents: "none" }} className="s1">
            <Sidebar currentPage="einsatzdaten" save_a={save_datas_einsatzdaten} datas={datasss}
                del={delete_d} instanz_erstellen={instanz_erstellen} />
            <Topbar currentPage="einsatzdaten" datas={datasss} />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="s1_body">
                <span className="s1_body_title">
                    Einsatzdaten
                </span>
                <div className="s1_body_components">
                    <div className="patient_body_components_line">

                        <span ref={finished_l} className="patient_body_components_line_label">
                            Protokoll fertig?
                        </span>
                        <div className="s1_body_components_line_right">
                            <select ref={finished} disabled={true}
                                onChange={handleOnChange} id="select_custom" className="s1_body_components_line_right_dropdown">
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="ja">Ja</option>
                                <option id="option_custom" className="patient_body_components_line_right_choice" value="nein">Nein</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Protokoll-ID:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                ref={protokoll_id}
                                disabled={true}
                            />

                            <button onClick={kopieren_id}>Kopieren</button>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Instance-Nummer:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                ref={instance_id}
                                disabled={true}
                            />

                            <button onClick={kopieren_instance}>Kopieren</button>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>

                    <div className="s1_body_components_line">
                        <span className="s1_body_components_line_label">
                            Benutzer name:
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="text"
                                className="s1_body_components_line_right_txt"
                                ref={benutzer_name}
                                disabled={true}
                            />

                            <button onClick={kopieren_benutzer_name}>Kopieren</button>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
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
                            Alarm-Zeit-Datum: *
                        </span>
                        <div className="s1_body_components_line_right">
                            <input required type="datetime-local"
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