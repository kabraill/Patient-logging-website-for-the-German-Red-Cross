import "./verletzungen.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";

import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Verletzungen() {

    const navigate = useNavigate();

    const [datasss, setDatasss] = useState();

    const isChecked_Schaedel_Hirn = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Gesicht = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_HWS = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Thorax = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Abdomen = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_BWS_LWS = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Becken = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Obere_Extremitaeten = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Untere_Extremitaeten = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_Weichteile = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);

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
                    setDatasss(datas)

                    console.log("datasssssssssssssssssssssssss : " + datas);

                    if (datas.verletzungen.Schaedel_Hirn.offen !== null) {
                        isChecked_Schaedel_Hirn.current[0].current.checked = datas.verletzungen.Schaedel_Hirn.offen;
                    }

                    if (datas.verletzungen.Schaedel_Hirn.geschlossen !== null) {
                        isChecked_Schaedel_Hirn.current[1].current.checked = datas.verletzungen.Schaedel_Hirn.geschlossen;
                    }

                    if (datas.verletzungen.Schaedel_Hirn.leicht !== null) {
                        isChecked_Schaedel_Hirn.current[2].current.checked = datas.verletzungen.Schaedel_Hirn.leicht;
                    }

                    if (datas.verletzungen.Schaedel_Hirn.mittel !== null) {
                        isChecked_Schaedel_Hirn.current[3].current.checked = datas.verletzungen.Schaedel_Hirn.mittel;
                    }

                    if (datas.verletzungen.Schaedel_Hirn.schwer !== null) {
                        isChecked_Schaedel_Hirn.current[4].current.checked = datas.verletzungen.Schaedel_Hirn.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.gesicht.offen !== null) {
                        isChecked_Gesicht.current[0].current.checked = datas.verletzungen.gesicht.offen;
                    }

                    if (datas.verletzungen.gesicht.geschlossen !== null) {
                        isChecked_Gesicht.current[1].current.checked = datas.verletzungen.gesicht.geschlossen;
                    }

                    if (datas.verletzungen.gesicht.leicht !== null) {
                        isChecked_Gesicht.current[2].current.checked = datas.verletzungen.gesicht.leicht;
                    }

                    if (datas.verletzungen.gesicht.mittel !== null) {
                        isChecked_Gesicht.current[3].current.checked = datas.verletzungen.gesicht.mittel;
                    }

                    if (datas.verletzungen.gesicht.schwer !== null) {
                        isChecked_Gesicht.current[4].current.checked = datas.verletzungen.gesicht.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.hws.offen !== null) {
                        isChecked_HWS.current[0].current.checked = datas.verletzungen.hws.offen;
                    }

                    if (datas.verletzungen.hws.geschlossen !== null) {
                        isChecked_HWS.current[1].current.checked = datas.verletzungen.hws.geschlossen;
                    }

                    if (datas.verletzungen.hws.leicht !== null) {
                        isChecked_HWS.current[2].current.checked = datas.verletzungen.hws.leicht;
                    }

                    if (datas.verletzungen.hws.mittel !== null) {
                        isChecked_HWS.current[3].current.checked = datas.verletzungen.hws.mittel;
                    }

                    if (datas.verletzungen.hws.schwer !== null) {
                        isChecked_HWS.current[4].current.checked = datas.verletzungen.hws.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.thorax.offen !== null) {
                        isChecked_Thorax.current[0].current.checked = datas.verletzungen.thorax.offen;
                    }

                    if (datas.verletzungen.thorax.geschlossen !== null) {
                        isChecked_Thorax.current[1].current.checked = datas.verletzungen.thorax.geschlossen;
                    }

                    if (datas.verletzungen.thorax.leicht !== null) {
                        isChecked_Thorax.current[2].current.checked = datas.verletzungen.thorax.leicht;
                    }

                    if (datas.verletzungen.thorax.mittel !== null) {
                        isChecked_Thorax.current[3].current.checked = datas.verletzungen.thorax.mittel;
                    }

                    if (datas.verletzungen.thorax.schwer !== null) {
                        isChecked_Thorax.current[4].current.checked = datas.verletzungen.thorax.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.abdomen.offen !== null) {
                        isChecked_Abdomen.current[0].current.checked = datas.verletzungen.abdomen.offen;
                    }

                    if (datas.verletzungen.abdomen.geschlossen !== null) {
                        isChecked_Abdomen.current[1].current.checked = datas.verletzungen.abdomen.geschlossen;
                    }

                    if (datas.verletzungen.abdomen.leicht !== null) {
                        isChecked_Abdomen.current[2].current.checked = datas.verletzungen.abdomen.leicht;
                    }

                    if (datas.verletzungen.abdomen.mittel !== null) {
                        isChecked_Abdomen.current[3].current.checked = datas.verletzungen.abdomen.mittel;
                    }

                    if (datas.verletzungen.abdomen.schwer !== null) {
                        isChecked_Abdomen.current[4].current.checked = datas.verletzungen.abdomen.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.bws_lws.offen !== null) {
                        isChecked_BWS_LWS.current[0].current.checked = datas.verletzungen.bws_lws.offen;
                    }

                    if (datas.verletzungen.bws_lws.geschlossen !== null) {
                        isChecked_BWS_LWS.current[1].current.checked = datas.verletzungen.bws_lws.geschlossen;
                    }

                    if (datas.verletzungen.bws_lws.leicht !== null) {
                        isChecked_BWS_LWS.current[2].current.checked = datas.verletzungen.bws_lws.leicht;
                    }

                    if (datas.verletzungen.bws_lws.mittel !== null) {
                        isChecked_BWS_LWS.current[3].current.checked = datas.verletzungen.bws_lws.mittel;
                    }

                    if (datas.verletzungen.bws_lws.schwer !== null) {
                        isChecked_BWS_LWS.current[4].current.checked = datas.verletzungen.bws_lws.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.becken.offen !== null) {
                        isChecked_Becken.current[0].current.checked = datas.verletzungen.becken.offen;
                    }

                    if (datas.verletzungen.becken.geschlossen !== null) {
                        isChecked_Becken.current[1].current.checked = datas.verletzungen.becken.geschlossen;
                    }

                    if (datas.verletzungen.becken.leicht !== null) {
                        isChecked_Becken.current[2].current.checked = datas.verletzungen.becken.leicht;
                    }

                    if (datas.verletzungen.becken.mittel !== null) {
                        isChecked_Becken.current[3].current.checked = datas.verletzungen.becken.mittel;
                    }

                    if (datas.verletzungen.becken.schwer !== null) {
                        isChecked_Becken.current[4].current.checked = datas.verletzungen.becken.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.obere_extremitaeten.offen !== null) {
                        isChecked_Obere_Extremitaeten.current[0].current.checked = datas.verletzungen.obere_extremitaeten.offen;
                    }

                    if (datas.verletzungen.obere_extremitaeten.geschlossen !== null) {
                        isChecked_Obere_Extremitaeten.current[1].current.checked = datas.verletzungen.obere_extremitaeten.geschlossen;
                    }

                    if (datas.verletzungen.obere_extremitaeten.leicht !== null) {
                        isChecked_Obere_Extremitaeten.current[2].current.checked = datas.verletzungen.obere_extremitaeten.leicht;
                    }

                    if (datas.verletzungen.obere_extremitaeten.mittel !== null) {
                        isChecked_Obere_Extremitaeten.current[3].current.checked = datas.verletzungen.obere_extremitaeten.mittel;
                    }

                    if (datas.verletzungen.obere_extremitaeten.schwer !== null) {
                        isChecked_Obere_Extremitaeten.current[4].current.checked = datas.verletzungen.obere_extremitaeten.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.untere_extremitaeten.offen !== null) {
                        isChecked_Untere_Extremitaeten.current[0].current.checked = datas.verletzungen.untere_extremitaeten.offen;
                    }

                    if (datas.verletzungen.untere_extremitaeten.geschlossen !== null) {
                        isChecked_Untere_Extremitaeten.current[1].current.checked = datas.verletzungen.untere_extremitaeten.geschlossen;
                    }

                    if (datas.verletzungen.untere_extremitaeten.leicht !== null) {
                        isChecked_Untere_Extremitaeten.current[2].current.checked = datas.verletzungen.untere_extremitaeten.leicht;
                    }

                    if (datas.verletzungen.untere_extremitaeten.mittel !== null) {
                        isChecked_Untere_Extremitaeten.current[3].current.checked = datas.verletzungen.untere_extremitaeten.mittel;
                    }

                    if (datas.verletzungen.untere_extremitaeten.schwer !== null) {
                        isChecked_Untere_Extremitaeten.current[4].current.checked = datas.verletzungen.untere_extremitaeten.schwer;
                    }

                    ///////////////////////////////////

                    if (datas.verletzungen.weichteile.offen !== null) {
                        isChecked_Weichteile.current[0].current.checked = datas.verletzungen.weichteile.offen;
                    }

                    if (datas.verletzungen.weichteile.geschlossen !== null) {
                        isChecked_Weichteile.current[1].current.checked = datas.verletzungen.weichteile.geschlossen;
                    }

                    if (datas.verletzungen.weichteile.leicht !== null) {
                        isChecked_Weichteile.current[2].current.checked = datas.verletzungen.weichteile.leicht;
                    }

                    if (datas.verletzungen.weichteile.mittel !== null) {
                        isChecked_Weichteile.current[3].current.checked = datas.verletzungen.weichteile.mittel;
                    }

                    if (datas.verletzungen.weichteile.schwer !== null) {
                        isChecked_Weichteile.current[4].current.checked = datas.verletzungen.weichteile.schwer;
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

    const save_datas_verletzungen = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_verletzungen",
                {
                    id: pub_draft_protocol_token.current.obj,
                    instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),
                    /////////////////////////////////////////////////////////////
                    offen_a: isChecked_Schaedel_Hirn.current[0].current.checked,
                    geschlossen_a: isChecked_Schaedel_Hirn.current[1].current.checked,
                    leicht_a: isChecked_Schaedel_Hirn.current[2].current.checked,
                    mittel_a: isChecked_Schaedel_Hirn.current[3].current.checked,
                    schwer_a: isChecked_Schaedel_Hirn.current[4].current.checked,
                    /////////////////////////////////////////////////////////////
                    offen_b: isChecked_Gesicht.current[0].current.checked,
                    geschlossen_b: isChecked_Gesicht.current[1].current.checked,
                    leicht_b: isChecked_Gesicht.current[2].current.checked,
                    mittel_b: isChecked_Gesicht.current[3].current.checked,
                    schwer_b: isChecked_Gesicht.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    offen_c: isChecked_HWS.current[0].current.checked,
                    geschlossen_c: isChecked_HWS.current[1].current.checked,
                    leicht_c: isChecked_HWS.current[2].current.checked,
                    mittel_c: isChecked_HWS.current[3].current.checked,
                    schwer_c: isChecked_HWS.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    offen_d: isChecked_Thorax.current[0].current.checked,
                    geschlossen_d: isChecked_Thorax.current[1].current.checked,
                    leicht_d: isChecked_Thorax.current[2].current.checked,
                    mittel_d: isChecked_Thorax.current[3].current.checked,
                    schwer_d: isChecked_Thorax.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    offen_e: isChecked_Abdomen.current[0].current.checked,
                    geschlossen_e: isChecked_Abdomen.current[1].current.checked,
                    leicht_e: isChecked_Abdomen.current[2].current.checked,
                    mittel_e: isChecked_Abdomen.current[3].current.checked,
                    schwer_e: isChecked_Abdomen.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    offen_f: isChecked_BWS_LWS.current[0].current.checked,
                    geschlossen_f: isChecked_BWS_LWS.current[1].current.checked,
                    leicht_f: isChecked_BWS_LWS.current[2].current.checked,
                    mittel_f: isChecked_BWS_LWS.current[3].current.checked,
                    schwer_f: isChecked_BWS_LWS.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    offen_g: isChecked_Becken.current[0].current.checked,
                    geschlossen_g: isChecked_Becken.current[1].current.checked,
                    leicht_g: isChecked_Becken.current[2].current.checked,
                    mittel_g: isChecked_Becken.current[3].current.checked,
                    schwer_g: isChecked_Becken.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    offen_h: isChecked_Obere_Extremitaeten.current[0].current.checked,
                    geschlossen_h: isChecked_Obere_Extremitaeten.current[1].current.checked,
                    leicht_h: isChecked_Obere_Extremitaeten.current[2].current.checked,
                    mittel_h: isChecked_Obere_Extremitaeten.current[3].current.checked,
                    schwer_h: isChecked_Obere_Extremitaeten.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    offen_i: isChecked_Untere_Extremitaeten.current[0].current.checked,
                    geschlossen_i: isChecked_Untere_Extremitaeten.current[1].current.checked,
                    leicht_i: isChecked_Untere_Extremitaeten.current[2].current.checked,
                    mittel_i: isChecked_Untere_Extremitaeten.current[3].current.checked,
                    schwer_i: isChecked_Untere_Extremitaeten.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    offen_j: isChecked_Weichteile.current[0].current.checked,
                    geschlossen_j: isChecked_Weichteile.current[1].current.checked,
                    leicht_j: isChecked_Weichteile.current[2].current.checked,
                    mittel_j: isChecked_Weichteile.current[3].current.checked,
                    schwer_j: isChecked_Weichteile.current[4].current.checked
                    //////////////////////////////////////////////////////////

                }
            );

            if (response.data === "Protocol nicht gefunden") {
                alert("Protocol nicht gefunden");
                localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                navigate('/einstellungen');
                return;
            }

            console.log("verletzungen : -------------------------------------------------------------------------------------------------------------------" + response.data);
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
            await save_datas_verletzungen();
        }
        await save();
        navigate('/monitoring');
    }

    const nav_previous = async () => {
        const save = async () => {
            await save_datas_verletzungen();
        }
        await save();
        navigate('/neurologie');
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
        <div id="main" style={{ pointerEvents: "none" }} className="verletzungen">
            <Sidebar currentPage="verletzungen" save_a={save_datas_verletzungen} datas={datasss}
                del={delete_d} instanz_erstellen={instanz_erstellen} />
            <Topbar currentPage="verletzungen" datas={datasss} />
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
                                    ref={isChecked_Schaedel_Hirn.current[0]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_geschlossen"
                                    ref={isChecked_Schaedel_Hirn.current[1]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_leicht"
                                    ref={isChecked_Schaedel_Hirn.current[2]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_mittel"
                                    ref={isChecked_Schaedel_Hirn.current[3]}
                                />
                                <label htmlFor="verletzungen_schaedel_hirn_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_schaedel_hirn_schwer"
                                    ref={isChecked_Schaedel_Hirn.current[4]}
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
                                    ref={isChecked_Gesicht.current[0]}
                                />
                                <label htmlFor="verletzungen_gesicht_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_geschlossen"
                                    ref={isChecked_Gesicht.current[1]}
                                />
                                <label htmlFor="verletzungen_gesicht_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_leicht"
                                    ref={isChecked_Gesicht.current[2]}
                                />
                                <label htmlFor="verletzungen_gesicht_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_mittel"
                                    ref={isChecked_Gesicht.current[3]}
                                />
                                <label htmlFor="verletzungen_gesicht_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_gesicht_schwer"
                                    ref={isChecked_Gesicht.current[4]}
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
                                    ref={isChecked_HWS.current[0]}
                                />
                                <label htmlFor="verletzungen_hws_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_geschlossen"
                                    ref={isChecked_HWS.current[1]}
                                />
                                <label htmlFor="verletzungen_hws_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_leicht"
                                    ref={isChecked_HWS.current[2]}
                                />
                                <label htmlFor="verletzungen_hws_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_mittel"
                                    ref={isChecked_HWS.current[3]}
                                />
                                <label htmlFor="verletzungen_hws_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_hws_schwer"
                                    ref={isChecked_HWS.current[4]}
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
                                    ref={isChecked_Thorax.current[0]}
                                />
                                <label htmlFor="verletzungen_thorax_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_geschlossen"
                                    ref={isChecked_Thorax.current[1]}
                                />
                                <label htmlFor="verletzungen_thorax_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_leicht"
                                    ref={isChecked_Thorax.current[2]}
                                />
                                <label htmlFor="verletzungen_thorax_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_mittel"
                                    ref={isChecked_Thorax.current[3]}
                                />
                                <label htmlFor="verletzungen_thorax_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_thorax_schwer"
                                    ref={isChecked_Thorax.current[4]}
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
                                    ref={isChecked_Abdomen.current[0]}
                                />
                                <label htmlFor="verletzungen_abdomen_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_geschlossen"
                                    ref={isChecked_Abdomen.current[1]}
                                />
                                <label htmlFor="verletzungen_abdomen_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_leicht"
                                    ref={isChecked_Abdomen.current[2]}
                                />
                                <label htmlFor="verletzungen_abdomen_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_mittel"
                                    ref={isChecked_Abdomen.current[3]}
                                />
                                <label htmlFor="verletzungen_abdomen_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_abdomen_schwer"
                                    ref={isChecked_Abdomen.current[4]}
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
                                    ref={isChecked_BWS_LWS.current[0]}
                                />
                                <label htmlFor="verletzungen_bws_lws_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_geschlossen"
                                    ref={isChecked_BWS_LWS.current[1]}
                                />
                                <label htmlFor="verletzungen_bws_lws_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_leicht"
                                    ref={isChecked_BWS_LWS.current[2]}
                                />
                                <label htmlFor="verletzungen_bws_lws_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_mittel"
                                    ref={isChecked_BWS_LWS.current[3]}
                                />
                                <label htmlFor="verletzungen_bws_lws_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_bws_lws_schwer"
                                    ref={isChecked_BWS_LWS.current[4]}
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
                                    ref={isChecked_Becken.current[0]}
                                />
                                <label htmlFor="verletzungen_becken_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_geschlossen"
                                    ref={isChecked_Becken.current[1]}
                                />
                                <label htmlFor="verletzungen_becken_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_leicht"
                                    ref={isChecked_Becken.current[2]}
                                />
                                <label htmlFor="verletzungen_becken_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_mittel"
                                    ref={isChecked_Becken.current[3]}
                                />
                                <label htmlFor="verletzungen_becken_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_becken_schwer"
                                    ref={isChecked_Becken.current[4]}
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
                                    ref={isChecked_Obere_Extremitaeten.current[0]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_geschlossen"
                                    ref={isChecked_Obere_Extremitaeten.current[1]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_leicht"
                                    ref={isChecked_Obere_Extremitaeten.current[2]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_mittel"
                                    ref={isChecked_Obere_Extremitaeten.current[3]}
                                />
                                <label htmlFor="verletzungen_obere_extremitaeten_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_obere_extremitaeten_schwer"
                                    ref={isChecked_Obere_Extremitaeten.current[4]}
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
                                    ref={isChecked_Untere_Extremitaeten.current[0]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_geschlossen"
                                    ref={isChecked_Untere_Extremitaeten.current[1]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_leicht"
                                    ref={isChecked_Untere_Extremitaeten.current[2]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_mittel"
                                    ref={isChecked_Untere_Extremitaeten.current[3]}
                                />
                                <label htmlFor="verletzungen_untere_extremitaeten_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_untere_extremitaeten_schwer"
                                    ref={isChecked_Untere_Extremitaeten.current[4]}
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
                                    ref={isChecked_Weichteile.current[0]}
                                />
                                <label htmlFor="verletzungen_weichteile_offen">Offen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_geschlossen"
                                    ref={isChecked_Weichteile.current[1]}
                                />
                                <label htmlFor="verletzungen_weichteile_geschlossen">Geschlossen</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_leicht"
                                    ref={isChecked_Weichteile.current[2]}
                                />
                                <label htmlFor="verletzungen_weichteile_leicht">Leicht</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_mittel"
                                    ref={isChecked_Weichteile.current[3]}
                                />
                                <label htmlFor="verletzungen_weichteile_mittel">Mittel</label>
                            </div>
                            <div className="verletzungen_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="verletzungen_weichteile_schwer"
                                    ref={isChecked_Weichteile.current[4]}
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