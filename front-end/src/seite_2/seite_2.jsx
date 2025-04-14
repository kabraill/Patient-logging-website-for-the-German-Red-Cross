import "./seite_2.css"

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos, Key
} from "@mui/icons-material";

import axios from "axios";

export default function Seite_2() {

    const navigate = useNavigate();

    const [datasss, setDatasss] = useState();

    const isChecked = useRef([useRef(), useRef(), useRef()]);
    const [Einsatzkraefte_patienten, setEinsatzkraefte_patienten] = useState({});
    const [Einsatzkraefte_ort, setEinsatzkraefte_ort] = useState({});

    const eingesetzte_fahrzeuge_l = useRef();
    const Einsatzkraefte_patienten_l = useRef();

    const pub_token = useRef();
    const pub_draft_protocol_token = useRef();


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
                //console.log(" dec :  " + new Date(decodedToken.exp * 1000))
                //console.log("login page isLoggedIn === 'true' && token")



                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_token', await encodeToken(decodedToken.userId));
                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'true');


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

                    if (datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.privat_pkw !== null) {

                        isChecked.current[0].current.checked = datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.privat_pkw;
                        //console.log("belueftung.unauffaellig : " + isChecked_belueftung.current[0].current.checked)
                    }

                    if (datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.feuerwehr_mtw !== null) {

                        isChecked.current[1].current.checked = datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.feuerwehr_mtw;
                        //console.log("belueftung.unauffaellig : " + isChecked_belueftung.current[1].current.checked)
                    }

                    if (datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.z_58_19_2 !== null) {

                        isChecked.current[2].current.checked = datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.z_58_19_2;
                        //console.log("belueftung.unauffaellig : " + isChecked_belueftung.current[2].current.checked)
                    }

                    const map_array1 = Object.values(datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge);


                    if (map_array1.includes(null)) {
                        eingesetzte_fahrzeuge_l.current.style.color = "red";
                    } else {
                        if (map_array1.includes(true)) {
                            eingesetzte_fahrzeuge_l.current.style.color = "black"
                        } else {
                            eingesetzte_fahrzeuge_l.current.style.color = "red"
                        }
                    }

                    setEinsatzkraefte_patienten(datas.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten);
                    /*for (let [key, value] of Object.entries(datas.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten)) {
                        if (value !== null) {
                            document.getElementById("beteiligte_einsatzkraefte_patienten_" + key).checked = value;
                        }
                    }*/


                    const map_array2 = Object.values(datas.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten);


                    if (map_array2.includes(null)) {
                        Einsatzkraefte_patienten_l.current.style.color = "red";
                    } else {
                        if (map_array2.includes(true)) {
                            Einsatzkraefte_patienten_l.current.style.color = "black"
                        } else {
                            Einsatzkraefte_patienten_l.current.style.color = "red"
                        }
                    }

                    setEinsatzkraefte_ort(datas.beteiligte_einsatzkraefte.einsatzkraefte_vor_ort)
                    /*for (let [key, value] of Object.entries(datas.beteiligte_einsatzkraefte.einsatzkraefte_vor_ort)) {
                        if (value !== null) {
                            document.getElementById("beteiligte_einsatzkraefte_ort_" + key).checked = value;
                        }

                    }*/

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

    const save_datas_beteiligte_einsatzkraefte = async () => {

        try {
            let obj = {
                id: pub_draft_protocol_token.current.obj,
                instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),
                privat_pkw: isChecked.current[0].current.checked,
                feuerwehr_mtw: isChecked.current[1].current.checked,
                z_58_19_2: isChecked.current[2].current.checked,
                patienten: {},
                ort: {}
            }

            for (let [k, v] of Object.entries(Einsatzkraefte_patienten)) {
                obj.patienten[k] = document.getElementById("beteiligte_einsatzkraefte_patienten_" + k).checked

            }

            for (let [k, v] of Object.entries(Einsatzkraefte_ort)) {
                obj.ort[k] = document.getElementById("beteiligte_einsatzkraefte_ort_" + k).checked

            }

            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_beteiligte_einsatzkraefte",
                obj
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
            await save_datas_beteiligte_einsatzkraefte();
        }
        await save();
        navigate('/patient');
    }

    const nav_previous = async () => {
        const save = async () => {
            await save_datas_beteiligte_einsatzkraefte();
        }
        await save();
        navigate('/einsatzdaten');
    }

    function handleOnChange(e, type) {
        let a = false;

        for (let i = 0; i < isChecked.current.length; i += 1) {
            if (isChecked.current[i].current.checked == true) {
                a = true;
                break;
            }
        }

        if (a == true) {
            eingesetzte_fahrzeuge_l.current.style.color = "black"
        } else {
            eingesetzte_fahrzeuge_l.current.style.color = "red"
        }

        console.log(type);

    }

    function handleOnChange_Einsatzkraefte_patienten(e, type) {
        //datasss.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten
        //id={"beteiligte_einsatzkraefte_patienten_" + key}

        setEinsatzkraefte_patienten((prevEinsatzkraefte_patienten) => ({
            ...prevEinsatzkraefte_patienten,
            [type]: !prevEinsatzkraefte_patienten[type], // Toggle the value when clicked
        }));

        let a = false;
        for (let [key, value] of Object.entries(datasss.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten)) {
            if (document.getElementById("beteiligte_einsatzkraefte_patienten_" + key).checked == true) {
                a = true;
                break;
            }
        }

        if (a == true) {
            Einsatzkraefte_patienten_l.current.style.color = "black"
        } else {
            Einsatzkraefte_patienten_l.current.style.color = "red"
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

    function do_nothing(e, type) {
        setEinsatzkraefte_ort((prevEinsatzkraefte_ort) => ({
            ...prevEinsatzkraefte_ort,
            [type]: !prevEinsatzkraefte_ort[type] // Toggle the value when clicked
        }));
    }

    return (
        <div id="main" style={{ pointerEvents: "none" }} className="s2">
            <Sidebar currentPage="beteiligte_einsatzkraefte" save_a={save_datas_beteiligte_einsatzkraefte} datas={datasss}
                del={delete_d} instanz_erstellen={instanz_erstellen} />
            <Topbar currentPage="beteiligte_einsatzkraefte" datas={datasss} />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";

            }} className="s2_body">
                <span className="s2_body_title">
                    Beteiligte Einsatzkräfte
                </span>
                <div className="s2_body_components">
                    <div className="s2_body_components_line">
                        <span ref={eingesetzte_fahrzeuge_l} className="s2_body_components_line_label">
                            Eingesetzte Fahrzeuge: *
                        </span>
                        <div className="s2_body_components_line_right">
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_private_pkw"
                                    ref={isChecked.current[0]}
                                    onChange={(e) => handleOnChange(e, "Privat PKW")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_private_pkw">Privat PKW</label>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_feuerwehr_mtw"
                                    ref={isChecked.current[1]}
                                    onChange={(e) => handleOnChange(e, "Feuerwehr MTW")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_feuerwehr_mtw">Feuerwehr MTW</label>
                            </div>
                            <div className="s2_body_components_line_right_dropdown">
                                <input
                                    type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                    id="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_58_19_2"
                                    ref={isChecked.current[2]}
                                    onChange={(e) => handleOnChange(e, "58/19-2")}
                                />
                                <label htmlFor="beteiligte_einsatzkraefte_engesetzte_fahrzeuge_58_19_2">58/19-2</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s2_body_components_line">
                        <span ref={Einsatzkraefte_patienten_l} className="s2_body_components_line_label">
                            Einsatzkräfte am Patienten: *
                        </span>
                        <div className="s2_body_components_line_right">
                            {
                                Object.entries(Einsatzkraefte_patienten).map(([keyy, value]) => (
                                    <div className="s2_body_components_line_right_dropdown" key={"pat" + keyy}>
                                        <input
                                            type="checkbox"
                                            className="s2_body_components_line_right_dropdown_checkbox"
                                            id={"beteiligte_einsatzkraefte_patienten_" + keyy}
                                            onChange={(e) => handleOnChange_Einsatzkraefte_patienten(e, keyy)}
                                            checked={value === null ? false : value}
                                        />
                                        <label htmlFor={"beteiligte_einsatzkraefte_patienten_" + keyy}>{keyy}</label>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="s2_body_components_line">
                        <span className="s2_body_components_line_label">
                            Einsatzkräfte vor Ort:
                        </span>
                        <div className="s2_body_components_line_right">
                            {
                                Object.entries(Einsatzkraefte_ort).map(([keyy, value]) => (
                                    <div className="s2_body_components_line_right_dropdown" key={"ort" + keyy}>
                                        <input
                                            type="checkbox" className="s2_body_components_line_right_dropdown_checkbox"
                                            id={"beteiligte_einsatzkraefte_ort_" + keyy}
                                            checked={value === null ? false : value}
                                            onChange={(e) => do_nothing(e, keyy)}
                                        />
                                        <label htmlFor={"beteiligte_einsatzkraefte_ort_" + keyy}>{keyy}</label>
                                    </div>
                                ))
                            }

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