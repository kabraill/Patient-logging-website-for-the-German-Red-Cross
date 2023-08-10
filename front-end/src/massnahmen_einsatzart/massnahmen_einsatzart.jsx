import "./massnahmen_einsatzart.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";


import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

import axios from "axios";

export default function Massnahmen_einsatzart() {

    const navigate = useNavigate();

    const [datasss, setDatasss] = useState();

    const ischeckedMassnahmen_value = useRef([useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(),
    useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]);
    const sonstigg = useRef();
    const Anzahl_Schocks = useRef();
    const Gegebene_Liter_min = useRef();
    const ischeckedEinsatzart_value = useRef([useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(),
    useRef()]);
    const sonstigg2 = useRef();
    const Weitere_beteiligte_Einsatzkraefte = useRef([useRef(), useRef()]);
    const sonstigg3 = useRef();
    const Uebergabe_an = useRef();
    const Freitext = useRef();

    const pub_token = useRef();
    const pub_draft_protocol_token = useRef();

    const Anzahl_Schocks_l = useRef();
    const Gegebene_Liter_min_l = useRef();
    const Uebergabe_an_l = useRef();

    

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

                    if (datas.massnahmen_einsatzart.massnahmen.atemwege_freimachen !== null) {
                        ischeckedMassnahmen_value.current[0].current.checked = datas.massnahmen_einsatzart.massnahmen.atemwege_freimachen;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.larynxtubus !== null) {
                        ischeckedMassnahmen_value.current[1].current.checked = datas.massnahmen_einsatzart.massnahmen.larynxtubus;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.o2_gabe !== null) {
                        ischeckedMassnahmen_value.current[2].current.checked = datas.massnahmen_einsatzart.massnahmen.o2_gabe;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.brille_maske_beutel !== null) {
                        ischeckedMassnahmen_value.current[3].current.checked = datas.massnahmen_einsatzart.massnahmen.brille_maske_beutel;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.sonstiges_siehe_text !== null) {
                        ischeckedMassnahmen_value.current[4].current.checked = datas.massnahmen_einsatzart.massnahmen.sonstiges_siehe_text;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.herzdruckmassage !== null) {
                        ischeckedMassnahmen_value.current[5].current.checked = datas.massnahmen_einsatzart.massnahmen.herzdruckmassage;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.aed !== null) {
                        ischeckedMassnahmen_value.current[6].current.checked = datas.massnahmen_einsatzart.massnahmen.aed;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.wundversorgung !== null) {
                        ischeckedMassnahmen_value.current[7].current.checked = datas.massnahmen_einsatzart.massnahmen.wundversorgung;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.hws_fixierung !== null) {
                        ischeckedMassnahmen_value.current[8].current.checked = datas.massnahmen_einsatzart.massnahmen.hws_fixierung;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.na_nachforderung !== null) {
                        ischeckedMassnahmen_value.current[9].current.checked = datas.massnahmen_einsatzart.massnahmen.na_nachforderung;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.seitenlage !== null) {
                        ischeckedMassnahmen_value.current[10].current.checked = datas.massnahmen_einsatzart.massnahmen.seitenlage;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.oberkoerper_hoch_sitzend !== null) {
                        ischeckedMassnahmen_value.current[11].current.checked = datas.massnahmen_einsatzart.massnahmen.oberkoerper_hoch_sitzend;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.flachlagerung !== null) {
                        ischeckedMassnahmen_value.current[12].current.checked = datas.massnahmen_einsatzart.massnahmen.flachlagerung;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.schocklage !== null) {
                        ischeckedMassnahmen_value.current[13].current.checked = datas.massnahmen_einsatzart.massnahmen.schocklage;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.ruhigstellung !== null) {
                        ischeckedMassnahmen_value.current[14].current.checked = datas.massnahmen_einsatzart.massnahmen.ruhigstellung;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.absicherung !== null) {
                        ischeckedMassnahmen_value.current[15].current.checked = datas.massnahmen_einsatzart.massnahmen.absicherung;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.einweisung_rd !== null) {
                        ischeckedMassnahmen_value.current[16].current.checked = datas.massnahmen_einsatzart.massnahmen.einweisung_rd;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.unterstuetzung_rd !== null) {
                        ischeckedMassnahmen_value.current[17].current.checked = datas.massnahmen_einsatzart.massnahmen.unterstuetzung_rd;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.nnd_abwartend !== null) {
                        ischeckedMassnahmen_value.current[18].current.checked = datas.massnahmen_einsatzart.massnahmen.nnd_abwartend;
                    }

                    if (datas.massnahmen_einsatzart.massnahmen.sonstiges !== null) {
                        sonstigg.current.value = datas.massnahmen_einsatzart.massnahmen.sonstiges;
                    }

                    ////////////////////////////////////////////

                    if (datas.massnahmen_einsatzart.bei_aed_anzahl_schocks !== null) {
                        Anzahl_Schocks.current.value = datas.massnahmen_einsatzart.bei_aed_anzahl_schocks;

                        if (Anzahl_Schocks.current.value.match('^([0-9]+)$') || Anzahl_Schocks.current.value === "") {
                            Anzahl_Schocks_l.current.style.color = "black";
                        } else {
                            Anzahl_Schocks_l.current.style.color = "red";
                        }
                    } else {
                        Anzahl_Schocks_l.current.style.color = "black";
                    }

                    if (datas.massnahmen_einsatzart.bei_o2_gegebene_liter_min !== null) {
                        Gegebene_Liter_min.current.value = datas.massnahmen_einsatzart.bei_o2_gegebene_liter_min;

                        if (Gegebene_Liter_min.current.value.match('^([0-9]+)$') || Gegebene_Liter_min.current.value === "") {
                            Gegebene_Liter_min_l.current.style.color = "black";
                        } else {
                            Gegebene_Liter_min_l.current.style.color = "red";
                        }
                    } else {
                        Gegebene_Liter_min_l.current.style.color = "black";
                    }
                    ///////////////////////////////////////////////

                    if (datas.massnahmen_einsatzart.einsatzart.verkehrsunfall !== null) {
                        ischeckedEinsatzart_value.current[0].current.checked = datas.massnahmen_einsatzart.einsatzart.verkehrsunfall;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.chirurgischer_notfall !== null) {
                        ischeckedEinsatzart_value.current[1].current.checked = datas.massnahmen_einsatzart.einsatzart.chirurgischer_notfall;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.internistischer_notfall !== null) {
                        ischeckedEinsatzart_value.current[2].current.checked = datas.massnahmen_einsatzart.einsatzart.internistischer_notfall;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.reanimation !== null) {
                        ischeckedEinsatzart_value.current[3].current.checked = datas.massnahmen_einsatzart.einsatzart.reanimation;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.infektionseinsatz !== null) {
                        ischeckedEinsatzart_value.current[4].current.checked = datas.massnahmen_einsatzart.einsatzart.infektionseinsatz;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.paediatrischer_notfall !== null) {
                        ischeckedEinsatzart_value.current[5].current.checked = datas.massnahmen_einsatzart.einsatzart.paediatrischer_notfall;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.arbeitsunfall !== null) {
                        ischeckedEinsatzart_value.current[6].current.checked = datas.massnahmen_einsatzart.einsatzart.arbeitsunfall;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.gynaekologischer_notfall !== null) {
                        ischeckedEinsatzart_value.current[7].current.checked = datas.massnahmen_einsatzart.einsatzart.gynaekologischer_notfall;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.fehleinsatz_siehe_protokoll_fehleinsatz !== null) {
                        ischeckedEinsatzart_value.current[8].current.checked = datas.massnahmen_einsatzart.einsatzart.fehleinsatz_siehe_protokoll_fehleinsatz;
                    }

                    if (datas.massnahmen_einsatzart.einsatzart.sonstiges !== null) {
                        sonstigg2.current.value = datas.massnahmen_einsatzart.einsatzart.sonstiges;
                    }
                    ////////////////////////////////////////////////////////////

                    if (datas.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.feuerwehr !== null) {
                        Weitere_beteiligte_Einsatzkraefte.current[0].current.checked = datas.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.feuerwehr;
                    }

                    if (datas.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.polizei !== null) {
                        Weitere_beteiligte_Einsatzkraefte.current[1].current.checked = datas.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.polizei;
                    }

                    if (datas.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.sonstiges !== null) {
                        sonstigg3.current.value = datas.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.sonstiges;
                    }
                    ////////////////////////////////////////////////////////

                    if (datas.massnahmen_einsatzart.uebergabe_an !== null) {
                        Uebergabe_an.current.value = datas.massnahmen_einsatzart.uebergabe_an;

                        if (Uebergabe_an.current.value === "") {
                            Uebergabe_an_l.current.style.color = "red";
                        } else {
                            Uebergabe_an_l.current.style.color = "black";
                        }
                    } else {
                        Uebergabe_an_l.current.style.color = "red";
                    }

                    if (datas.massnahmen_einsatzart.freitext !== null) {
                        Freitext.current.value = datas.massnahmen_einsatzart.freitext;
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
    }, []);

    const save_datas_massnahmen_einsatzart = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_massnahmen_einsatzart",
                {
                    id: pub_draft_protocol_token.current.obj,
                    instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),

                    ischeckedMassnahmen_atemwege_freimachen: ischeckedMassnahmen_value.current[0].current.checked,
                    ischeckedMassnahmen_larynxtubus: ischeckedMassnahmen_value.current[1].current.checked,
                    ischeckedMassnahmen_o2_gabe: ischeckedMassnahmen_value.current[2].current.checked,
                    ischeckedMassnahmen_brille_maske_beutel: ischeckedMassnahmen_value.current[3].current.checked,

                    ischeckedMassnahmen_sonstiges_siehe_text: ischeckedMassnahmen_value.current[4].current.checked,
                    ischeckedMassnahmen_herzdruckmassage: ischeckedMassnahmen_value.current[5].current.checked,
                    ischeckedMassnahmen_aed: ischeckedMassnahmen_value.current[6].current.checked,
                    ischeckedMassnahmen_wundversorgung: ischeckedMassnahmen_value.current[7].current.checked,

                    ischeckedMassnahmen_hws_fixierung: ischeckedMassnahmen_value.current[8].current.checked,
                    ischeckedMassnahmen_na_nachforderung: ischeckedMassnahmen_value.current[9].current.checked,
                    ischeckedMassnahmen_seitenlage: ischeckedMassnahmen_value.current[10].current.checked,
                    ischeckedMassnahmen_oberkoerper_hoch_sitzend: ischeckedMassnahmen_value.current[11].current.checked,

                    ischeckedMassnahmen_flachlagerung: ischeckedMassnahmen_value.current[12].current.checked,
                    ischeckedMassnahmen_schocklage: ischeckedMassnahmen_value.current[13].current.checked,
                    ischeckedMassnahmen_ruhigstellung: ischeckedMassnahmen_value.current[14].current.checked,
                    ischeckedMassnahmen_absicherung: ischeckedMassnahmen_value.current[15].current.checked,

                    ischeckedMassnahmen_einweisung_rd: ischeckedMassnahmen_value.current[16].current.checked,
                    ischeckedMassnahmen_unterstuetzung_rd: ischeckedMassnahmen_value.current[17].current.checked,
                    ischeckedMassnahmen_nnd_abwartend: ischeckedMassnahmen_value.current[18].current.checked,
                    ischeckedMassnahmen_sonstiges: sonstigg.current.value,
                    /////////////////
                    bei_aed_anzahl_schocks_a: Anzahl_Schocks.current.value,
                    bei_o2_gegebene_liter_min_a: Gegebene_Liter_min.current.value,
                    /////////////////
                    ischeckedEinsatzart_verkehrsunfall: ischeckedEinsatzart_value.current[0].current.checked,
                    ischeckedEinsatzart_chirurgischer_notfall: ischeckedEinsatzart_value.current[1].current.checked,
                    ischeckedEinsatzart_internistischer_notfall: ischeckedEinsatzart_value.current[2].current.checked,
                    ischeckedEinsatzart_reanimation: ischeckedEinsatzart_value.current[3].current.checked,
                    ischeckedEinsatzart_infektionseinsatz: ischeckedEinsatzart_value.current[4].current.checked,
                    ischeckedEinsatzart_paediatrischer_notfall: ischeckedEinsatzart_value.current[5].current.checked,
                    ischeckedEinsatzart_arbeitsunfall: ischeckedEinsatzart_value.current[6].current.checked,
                    ischeckedEinsatzart_gynaekologischer_notfall: ischeckedEinsatzart_value.current[7].current.checked,
                    ischeckedEinsatzart_fehleinsatz_siehe_protokoll_fehleinsatz: ischeckedEinsatzart_value.current[8].current.checked,
                    ischeckedEinsatzart_sonstiges: sonstigg2.current.value,
                    /////////////////
                    Weitere_beteiligte_Einsatzkraefte_feuerwehr: Weitere_beteiligte_Einsatzkraefte.current[0].current.checked,
                    Weitere_beteiligte_Einsatzkraefte_polizei: Weitere_beteiligte_Einsatzkraefte.current[1].current.checked,
                    Weitere_beteiligte_Einsatzkraefte_sonstiges: sonstigg3.current.value,
                    ////////////////
                    Uebergabe_an_a: Uebergabe_an.current.value,
                    Freitext_a: Freitext.current.value
                }
            );

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

    const nav_previous = async () => {
        const save = async () => {
            await save_datas_massnahmen_einsatzart();
        }
        await save();
        navigate('/monitoring');
    }

    const nav_next = async () => {
        const save = async () => {
            await save_datas_massnahmen_einsatzart();
        }
        await save();
        navigate('/vorschau');
    }

    const handleInputChange_Uebergabe_an = (e) => {

        if (e.target.value === "") {
            Uebergabe_an_l.current.style.color = "red";
        } else {
            Uebergabe_an_l.current.style.color = "black";
        }
    }

    const handleInputChange_Anzahl_Schocks = (e) => {

        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            Anzahl_Schocks_l.current.style.color = "black";
        } else {
            Anzahl_Schocks_l.current.style.color = "red";
        }
    }

    const handleInputChange_Gegebene_Liter_min = (e) => {

        if (e.target.value.match('^([0-9]+)$') || e.target.value === "") {
            Gegebene_Liter_min_l.current.style.color = "black";
        } else {
            Gegebene_Liter_min_l.current.style.color = "red";
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


    return (
        <div id="main" style={{ pointerEvents: "none" }} className="massnahmen_einsatzart">
            <Sidebar currentPage="massnahmen_einsatzart" save_a={save_datas_massnahmen_einsatzart} datas={datasss}
            del={delete_d} instanz_erstellen={instanz_erstellen} />
            <Topbar currentPage="massnahmen_einsatzart" datas={datasss} />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="massnahmen_einsatzart_body">
                <span className="massnahmen_einsatzart_body_title">
                    Maßnahmen & Einsatzart
                </span>

                <div className="massnahmen_einsatzart_body_components">
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Maßnahmen:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right3">
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_atemwege_freimachen"
                                    ref={ischeckedMassnahmen_value.current[0]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_atemwege_freimachen">Atemwege freimachen</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_larynxtubus"
                                    ref={ischeckedMassnahmen_value.current[1]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_larynxtubus">Larynxtubus</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_o2_gabe"
                                    ref={ischeckedMassnahmen_value.current[2]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_o2_gabe">O2 Gabe</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_brille_maske_beutel"
                                    ref={ischeckedMassnahmen_value.current[3]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_brille_maske_beutel">Brille/Maske/Beutel</label>
                            </div>
                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_sonstiges_siehe_text"
                                    ref={ischeckedMassnahmen_value.current[4]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_sonstiges_siehe_text">sonstiges ...siehe Text</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_herzdruckmassage"
                                    ref={ischeckedMassnahmen_value.current[5]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_herzdruckmassage">Herzdruckmassage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_aed"
                                    ref={ischeckedMassnahmen_value.current[6]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_aed">AED</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_wunderversorgung"
                                    ref={ischeckedMassnahmen_value.current[7]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_wunderversorgung">Wundversorgung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_hws_fixierung"
                                    ref={ischeckedMassnahmen_value.current[8]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_hws_fixierung">HWS Fixierung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_na_nachforderung"
                                    ref={ischeckedMassnahmen_value.current[9]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_na_nachforderung">NA Nachforderung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_seitenlage"
                                    ref={ischeckedMassnahmen_value.current[10]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_seitenlage">Seitenlage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_oberkorper_hoch_sitzend"
                                    ref={ischeckedMassnahmen_value.current[11]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_oberkorper_hoch_sitzend">Oberkörper hoch/sitzend</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_flachlagerung"
                                    ref={ischeckedMassnahmen_value.current[12]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_flachlagerung">Flachlagerung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_schocklage"
                                    ref={ischeckedMassnahmen_value.current[13]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_schocklage">Schocklage</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_ruhigstellung"
                                    ref={ischeckedMassnahmen_value.current[14]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_ruhigstellung">Ruhigstellung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_absicherung"
                                    ref={ischeckedMassnahmen_value.current[15]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_absicherung">Absicherung</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_einweisung_rd"
                                    ref={ischeckedMassnahmen_value.current[16]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_einweisung_rd">Einweisung RD</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_unterstutzung_rd"
                                    ref={ischeckedMassnahmen_value.current[17]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_unterstutzung_rd">Unterstützung RD</label>
                            </div>

                            <div className="massnahmen_einsatzart_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="massnahmen_einsatzart_massnahmen_nnd_abwartend"
                                    ref={ischeckedMassnahmen_value.current[18]}
                                />
                                <label htmlFor="massnahmen_einsatzart_massnahmen_nnd_abwartend">NND abwartend</label>
                            </div>

                            <input placeholder="Sonstiges" ref={sonstigg} className="massnahmen_einsatzart_body_components_line_right3_sontiges" />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span ref={Anzahl_Schocks_l} className="massnahmen_einsatzart_body_components_line_label">
                            Bei AED: Anzahl Schocks:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                ref={Anzahl_Schocks}
                                onChange={handleInputChange_Anzahl_Schocks}
                                placeholder="Z.B 2"
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="massnahmen_einsatzart_body_components_line">
                        <span ref={Gegebene_Liter_min_l} className="massnahmen_einsatzart_body_components_line_label">
                            Bei O2: Gegebene Liter/min:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                ref={Gegebene_Liter_min}
                                onChange={handleInputChange_Gegebene_Liter_min}
                                placeholder="Z.B 4"
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
                                        id="massnahmen_einsatzart_einsatzart_verkehrsunfall"
                                        ref={ischeckedEinsatzart_value.current[0]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_verkehrsunfall">Verkehrsunfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_chirurgischer_notfall"
                                        ref={ischeckedEinsatzart_value.current[1]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_chirurgischer_notfall">Chirurgischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_internistischer_notfall"
                                        ref={ischeckedEinsatzart_value.current[2]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_internistischer_notfall">Internistischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect_marking">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_reanimation"
                                        ref={ischeckedEinsatzart_value.current[3]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_reanimation">Reanimation</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_infektionseinsatz"
                                        ref={ischeckedEinsatzart_value.current[4]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_infektionseinsatz">Infektionseinsatz</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_paediatrischer_notfall"
                                        ref={ischeckedEinsatzart_value.current[5]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_paediatrischer_notfall">Paediatrischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_arbeitsunfall"
                                        ref={ischeckedEinsatzart_value.current[6]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_arbeitsunfall">Arbeitsunfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_gynaekologischer_notfall"
                                        ref={ischeckedEinsatzart_value.current[7]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_gynaekologischer_notfall">Gynäkologischer Notfall</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_einsatzart_fehleinsatz_siehe_protokoll_fehleinsatz"
                                        ref={ischeckedEinsatzart_value.current[8]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_einsatzart_fehleinsatz_siehe_protokoll_fehleinsatz">Fehleinsatz ..siehe Protokoll Fehleinsatz..</label>
                                </div>

                            </div>
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                ref={sonstigg2}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span className="massnahmen_einsatzart_body_components_line_label">
                            Weitere beteiligte Einsatzkräfte:
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right4">
                            <div className="massnahmen_einsatzart_body_components_line_right2_body">
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        id="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_feuerwehr"
                                        type="checkbox"
                                        ref={Weitere_beteiligte_Einsatzkraefte.current[0]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_feuerwehr">Feuerwehr</label>
                                </div>
                                <div className="massnahmen_einsatzart_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_polizei"
                                        ref={Weitere_beteiligte_Einsatzkraefte.current[1]}
                                    />
                                    <label htmlFor="massnahmen_einsatzart_weitere_beteiligte_einsatzkraefte_polizei">Polizei</label>
                                </div>
                            </div>

                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                ref={sonstigg3}
                            />
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="massnahmen_einsatzart_body_components_line">
                        <span ref={Uebergabe_an_l} className="massnahmen_einsatzart_body_components_line_label">
                            Übergabe an: *
                        </span>
                        <div className="massnahmen_einsatzart_body_components_line_right">
                            <input type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                ref={Uebergabe_an}
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
                            <textarea type="text"
                                className="massnahmen_einsatzart_body_components_line_right_txt"
                                ref={Freitext}
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