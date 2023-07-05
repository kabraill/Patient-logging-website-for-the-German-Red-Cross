import "./vorschau.css"

import React, { useState, useEffect, useRef } from 'react';

import {
    PDFViewer, Document, Page, Text, View, StyleSheet,
    Image
} from '@react-pdf/renderer';

import { Save } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";


import Topbar from '../topbar/topbar';
import Sidebar from '../sidebar/sidebar';

import axios from "axios";

export default function Vorschau() {
    const navigate = useNavigate();

    const pub_token = useRef();
    const pub_draft_protocol_token = useRef();
    const [datass, setDatass] = useState("");

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
                    setDatass(datas);


                    //seite_1////////////////////////////////////////////////////////
                    if (datas.einsatzdaten.alarmschluessel !== null) {

                        if (!datas.einsatzdaten.alarmschluessel.match('^[123][0-9]{3}[NBnb]?$')) {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    } else {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    }


                    if (datas.einsatzdaten.keine_auftragnummer !== null) {
                        if (!datas.einsatzdaten.keine_auftragnummer) {
                            if (datas.einsatzdaten.auftragsnummer !== null) {

                                if (!datas.einsatzdaten.auftragsnummer.match('^([0-9]+)$')) {
                                    document.getElementById("aaaa").style.pointerEvents = "none";
                                }
                            } else {
                                document.getElementById("aaaa").style.pointerEvents = "none";
                            }
                        }
                    } else {
                        if (datas.einsatzdaten.auftragsnummer !== null) {

                            if (!datas.einsatzdaten.auftragsnummer.match('^([0-9]+)$')) {
                                document.getElementById("aaaa").style.pointerEvents = "none";
                            }
                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    if (datas.einsatzdaten.alarmzeit !== null) {

                        if (!datas.einsatzdaten.alarmzeit.match('^[0-9][0-9]:[0-9][0-9]$')) {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    } else {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    }


                    if (datas.einsatzdaten.ankunft_hvo !== null) {

                        if (!datas.einsatzdaten.ankunft_hvo.match('^[0-9][0-9]:[0-9][0-9]$')) {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    } else {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    }

                    if (datas.einsatzdaten.einsatzende !== null) {

                        if (!datas.einsatzdaten.einsatzende.match('^[0-9][0-9]:[0-9][0-9]$')) {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    } else {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    }
                    //seite_2///////////////////////////////////////////////////////////////////////
                    const map_array1 = Object.values(datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge);

                    if (map_array1.includes(null)) {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    } else {
                        if (map_array1.includes(true)) {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    const map_array2 = Object.values(datas.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten);

                    if (map_array2.includes(null)) {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    } else {
                        if (map_array2.includes(true)) {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    //patient/////////////////////////////////////////////////////////////////////////
                    if (datas.patient.geschlecht !== null) {

                        if (datas.patient.geschlecht === "unbekannt") {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    } else {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    }

                    if (datas.patient.alter !== null) {

                        if (!datas.patient.alter.match('^([0-9]+)$')) {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    } else {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    }

                    //anamnese/////////////////////////////////////////////////////////////////////////
                    if (datas.anamnese.atemwege !== null) {

                        if (datas.anamnese.atemwege === "") {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    } else {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    }

                    const map_array21 = Object.values(datas.anamnese.belueftung);

                    if (map_array21.includes(null)) {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    } else {
                        if (map_array21.includes(true) || datas.anamnese.belueftung.sonstiges !== "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    const map_array22 = Object.values(datas.anamnese.puls);

                    if (map_array22.includes(null)) {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    } else {
                        if (map_array22.includes(true)) {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    const map_array23 = Object.values(datas.anamnese.haut);

                    if (map_array23.includes(null)) {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    } else {
                        if (map_array23.includes(true)) {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    //messwerte////////////////////////////////////////////////////////////////

                    if (datas.messwerte.keine_messwerte !== null) {
                        if (!datas.messwerte.keine_messwerte) {

                            if (datas.messwerte.puls !== null) {

                                if (datas.messwerte.puls.match("^([0-9]+)$") || datas.messwerte.puls === "") {

                                } else {
                                    document.getElementById("aaaa").style.pointerEvents = "none";
                                }
                            }

                            if (datas.messwerte.blutdruck !== null) {

                                if (datas.messwerte.blutdruck.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || datas.messwerte.blutdruck === "") {

                                } else {
                                    document.getElementById("aaaa").style.pointerEvents = "none";
                                }
                            }

                            if (datas.messwerte.spo2 !== null) {

                                if (datas.messwerte.spo2.match("^([0-9]+)$") || datas.messwerte.spo2 === "") {

                                } else {
                                    document.getElementById("aaaa").style.pointerEvents = "none";
                                }
                            }

                        }
                    } else {

                        if (datas.messwerte.puls !== null) {

                            if (datas.messwerte.puls.match("^([0-9]+)$") || datas.messwerte.puls === "") {

                            } else {
                                document.getElementById("aaaa").style.pointerEvents = "none";
                            }
                        }

                        if (datas.messwerte.blutdruck !== null) {

                            if (datas.messwerte.blutdruck.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || datas.messwerte.blutdruck === "") {

                            } else {
                                document.getElementById("aaaa").style.pointerEvents = "none";
                            }
                        }

                        if (datas.messwerte.spo2 !== null) {

                            if (datas.messwerte.spo2.match("^([0-9]+)$") || datas.messwerte.spo2 === "") {

                            } else {
                                document.getElementById("aaaa").style.pointerEvents = "none";
                            }
                        }
                    }

                    //neurologie///////////////////////////////////////////////////////////////

                    if (datas.neurologie.blutzucker !== null) {

                        if (datas.neurologie.blutzucker.match("^([0-9]+|low|high)$") || datas.neurologie.blutzucker === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    if (datas.neurologie.schmerzskala_0_10 !== null) {

                        if (datas.neurologie.schmerzskala_0_10.match("^([0-9]|10)$") || datas.neurologie.schmerzskala_0_10 === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    //monitoring////////////////////////////////////////////////////////////////

                    if (datas.monitoring.puls_1 !== null) {

                        if (datas.monitoring.puls_1.match('^([0-9]+)$') || datas.monitoring.puls_1 === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    if (datas.monitoring.blutdruck_1 !== null) {

                        if (datas.monitoring.blutdruck_1.match('^[0-9]{1,3}\\/[0-9]{1,3}$') || datas.monitoring.blutdruck_1 === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    if (datas.monitoring.spo2_1 !== null) {

                        if (datas.monitoring.spo2_1.match('^([0-9]+)$') || datas.monitoring.spo2_1 === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }



                    if (datas.monitoring.puls_2 !== null) {

                        if (datas.monitoring.puls_2.match('^([0-9]+)$') || datas.monitoring.puls_2 === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    if (datas.monitoring.blutdruck_2 !== null) {

                        if (datas.monitoring.blutdruck_2.match('^[0-9]{1,3}\\/[0-9]{1,3}$') || datas.monitoring.blutdruck_2 === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    if (datas.monitoring.spo2_2 !== null) {

                        if (datas.monitoring.spo2_2.match('^([0-9]+)$') || datas.monitoring.spo2_2 === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    //massnahmen und einsatzart//////////////////////////////////////////////////////////////////

                    if (datas.massnahmen_einsatzart.bei_aed_anzahl_schocks !== null) {

                        if (datas.massnahmen_einsatzart.bei_aed_anzahl_schocks.match('^([0-9]+)$') || datas.massnahmen_einsatzart.bei_aed_anzahl_schocks === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    if (datas.massnahmen_einsatzart.bei_o2_gegebene_liter_min !== null) {

                        if (datas.massnahmen_einsatzart.bei_o2_gegebene_liter_min.match('^([0-9]+)$') || datas.massnahmen_einsatzart.bei_o2_gegebene_liter_min === "") {

                        } else {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    }

                    if (datas.massnahmen_einsatzart.uebergabe_an !== null) {

                        if (datas.massnahmen_einsatzart.uebergabe_an === "") {
                            document.getElementById("aaaa").style.pointerEvents = "none";
                        }
                    } else {
                        document.getElementById("aaaa").style.pointerEvents = "none";
                    }
                    //
                    if (document.getElementById("aaaa").style.pointerEvents === "none") {
                        document.getElementById("res").textContent = "Falsche Eingaben!!";
                        document.getElementById("res").style.color = "crimson";
                        document.getElementById("save_finished_protocol").style.pointerEvents = "none";
                    } else {
                        document.getElementById("res").textContent = "Alle Eingaben sind richtig";
                        document.getElementById("res").style.color = "black";
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

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 10
        },
        image: {
            maxHeight: 30,
            width: 100,
            objectFit: "contain",
            marginTop: 10
        },
        pdf_head: {
            fontSize: 20,
            marginTop: 10,
            fontFamily: 'Helvetica-Bold',
        },
        label_text_container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap"
        },
        label_name: {
            fontSize: 14,
            fontFamily: 'Helvetica-Bold',
        },
        text_element: {
            fontSize: 13,
            fontFamily: "Helvetica",
        },
        page_name: {
            fontSize: 16,
            fontFamily: 'Helvetica-Bold',
            color: "red",
            marginTop: 10
        },
        horizontal_line: {
            width: "100%",
            borderTop: "1px solid gray"

        },
        check_box: {
            backgroundColor: "rgb(200,200,200)",
            fontSize: 13,
            fontFamily: 'Helvetica-Bold',
        },
        /********************************************/
        container1: {
            display: 'flex',
            alignItems: "center",
            justifyContent: 'space-around',
            flexDirection: 'row',
            border: "1px solid gray",
            width: "95%",
            flexWrap: "wrap",
            gap: 10,
            padding: 2
        },
        /********************************************/
        container2: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            border: "1px solid gray",
            width: "95%",
            gap: 5
        },
        under_container2: {
            display: 'flex',
            alignItems: "center",
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: "100%",
            flexWrap: "wrap",
            gap: 10,
            padding: 2
        }


    });

    const savee = () => {

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

    const save_finished_pro = async () => {
        const save_finished_pro_a = async () => {
            const creation_datee = await getTimeFromServer();
            const del_time = new Date(creation_datee);
            del_time.setFullYear(del_time.getFullYear() + 10);
            //del_time.setMinutes(del_time.getMinutes() + 2);
            const user_id = pub_token.current.userId;

            datass.creation_date = creation_datee;
            datass.created_by = user_id;
            datass.delete_time = del_time;

            try {
                const response = await axios.post("http://localhost:8800/protocol_finished/create", {
                    content: [datass]
                });

            } catch (error) {
                console.log(error);
            }

            alert("Das Protokoll wurde als fertiges Protokoll gespeichert");
        }
        await save_finished_pro_a();
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
        return (<div style={{ pointerEvents: "none" }} className="vorschau">
            <Sidebar currentPage="vorschau" />
            <Topbar />
            <div className="vorschau_body">
                <span className="vorschau_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="vorschau">
            <Sidebar currentPage="vorschau" save_a={savee} datas={datass} 
            del={delete_d} instanz_erstellen={instanz_erstellen} />
            <Topbar currentPage="vorschau" datas={datass} />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";

            }} className="vorschau_body">
                <span className="vorschau_body_title">
                    Vorschau
                </span>

                <span id="res" className="vorschau_body_result">

                </span>

                <PDFViewer id="aaaa" className="vorschau_pdf_viewer" width="826" height="600" >
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <Image
                                style={styles.image}
                                src="assets/red_cross.png"
                            />
                            <Text style={styles.pdf_head}>DRK HvO Protokollierer</Text>

                            <Text style={styles.page_name}>Einsatzdaten</Text>

                            <View style={styles.container1}>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Alarmschlüssel:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.einsatzdaten.alarmschluessel}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Auftragsnummer:
                                        <Text style={styles.text_element}> {(datass === "" || datass.einsatzdaten.keine_auftragnummer) ? "" : datass.einsatzdaten.auftragsnummer}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Einsatzort:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.einsatzdaten.einsatzort}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Alarmzeit:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.einsatzdaten.alarmzeit}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Ankunft HvO:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.einsatzdaten.ankunft_hvo}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Ankunft RTW / NEF:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.einsatzdaten.ankunft_rtw_nef}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Einsatzende:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.einsatzdaten.einsatzende}</Text>
                                    </Text>

                                </View>

                            </View>

                            <Text style={styles.page_name}>Beteiligte Einsatzkräfte</Text>

                            <View style={styles.container2}>
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Eingesetzte Fahrzeuge:</Text>
                                    <Text style={styles.text_element}>Privat PKW:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.privat_pkw ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Feuerwehr MTW:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.feuerwehr_mtw ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>58/19-2:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge.z_58_19_2 ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Einsatzkräfte am Patienten:</Text>
                                    <Text style={styles.text_element}>Nils Rubehn:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten.x ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Gabriel Schneider:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten.y ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Arnold Schwarzenegger:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten.z ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Einsatzkräfte vor Ort:</Text>
                                    <Text style={styles.text_element}>Nils Rubehn:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.einsatzkraefte_vor_ort.x ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Gabriel Schneider:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.einsatzkraefte_vor_ort.y ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Arnold Schwarzenegger:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.beteiligte_einsatzkraefte.einsatzkraefte_vor_ort.z ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.page_name}>Patient</Text>

                            <View style={styles.container1}>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Geschlecht:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.patient.geschlecht}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Alter:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.patient.alter}</Text>
                                    </Text>

                                </View>
                            </View>

                            <Text style={styles.page_name}>Anamnese</Text>

                            <View style={styles.container2}>
                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Atemwege:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.anamnese.atemwege}</Text>
                                        </Text>

                                    </View>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Belüftung:</Text>
                                    <Text style={styles.text_element}>Unauffällig:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.belueftung.unauffaellig ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Zyanose:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.belueftung.zyanose ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Rasseln:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.belueftung.rasseln ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schnappatmung:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.belueftung.schnappatmung ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Atemnot:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.belueftung.atemnot ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Hyperventillation:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.belueftung.hyperventillation ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Atemstillstand:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.belueftung.atemstillstand ? "X" : " ")}</Text>
                                    </Text>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Sonstiges:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.anamnese.belueftung.sonstiges}</Text>
                                        </Text>

                                    </View>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Puls:</Text>
                                    <Text style={styles.text_element}>Regelmäßig:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.puls.regelmaessig ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Unregelmäßig:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.puls.unregelmaessig ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Gut tastbar:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.puls.gut_tastbar ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schlecht tastbar:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.puls.schlecht_tastbar ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Nicht tastbar:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.puls.nicht_tastbar ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Haut:</Text>
                                    <Text style={styles.text_element}>Rosig:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.haut.rosig ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Blass:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.haut.blass ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Blau:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.haut.blau ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Rot:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.haut.rot ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Warm:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.haut.warm ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Kalt:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.anamnese.haut.kalt ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.page_name}>Messwerte</Text>

                            <View style={styles.container1}>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Puls:
                                        <Text style={styles.text_element}> {(datass === "" || datass.messwerte.keine_messwerte) ? "" : datass.messwerte.puls}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>Blutdruck:
                                        <Text style={styles.text_element}> {(datass === "" || datass.messwerte.keine_messwerte) ? "" : datass.messwerte.blutdruck}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>SpO2:
                                        <Text style={styles.text_element}> {(datass === "" || datass.messwerte.keine_messwerte) ? "" : datass.messwerte.spo2}</Text>
                                    </Text>

                                </View>
                            </View>

                            <Text style={styles.page_name}>Neurologie</Text>

                            <View style={styles.container2}>
                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Bewusstsein:
                                            <Text style={styles.text_element}> {datass === "" ? "" : (datass.neurologie.bewusstsein === null ? "orientiert" : datass.neurologie.bewusstsein)}</Text>
                                        </Text>

                                    </View>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Blutzucker:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.neurologie.blutzucker}</Text>
                                        </Text>

                                    </View>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Pupille Links:</Text>
                                    <Text style={styles.text_element}>Eng:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_links.eng ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_links.mitte ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Weit:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_links.weit ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>keine Lichtreflexe:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_links.keine_lichtreflexe ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Entrundet:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_links.entrundet ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Pupille Rechts:</Text>
                                    <Text style={styles.text_element}>Eng:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_rechts.eng ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_rechts.mitte ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Weit:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_rechts.weit ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>keine Lichtreflexe:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_rechts.keine_lichtreflexe ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Entrundet:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.neurologie.pupille_rechts.entrundet ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Schmerzen:
                                            <Text style={styles.text_element}> {datass === "" ? "" : (datass.neurologie.schmerzen === null ? "keine" : datass.neurologie.schmerzen)}</Text>
                                        </Text>

                                    </View>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Schmerzskala 0-10:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.neurologie.schmerzskala_0_10}</Text>
                                        </Text>

                                    </View>
                                </View>
                            </View>

                        </Page>

                        <Page size="A4" style={styles.page}>
                            <Text style={styles.page_name}>Verletzungen</Text>

                            <View style={styles.container2}>
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Schädel-Hirn:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.Schaedel_Hirn.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.Schaedel_Hirn.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.Schaedel_Hirn.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.Schaedel_Hirn.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.Schaedel_Hirn.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Gesicht:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.gesicht.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.gesicht.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.gesicht.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.gesicht.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.gesicht.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>HWS:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.hws.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.hws.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.hws.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.hws.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.hws.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Thorax:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.thorax.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.thorax.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.thorax.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.thorax.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.thorax.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Abdomen:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.abdomen.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.abdomen.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.abdomen.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.abdomen.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.abdomen.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>BWS/LWS:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.bws_lws.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.bws_lws.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.bws_lws.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.bws_lws.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.bws_lws.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Becken:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.becken.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.becken.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.becken.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.becken.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.becken.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Obere-Extremitäten:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.obere_extremitaeten.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.obere_extremitaeten.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.obere_extremitaeten.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.obere_extremitaeten.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.obere_extremitaeten.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Untere-Extremitäten:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.untere_extremitaeten.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.untere_extremitaeten.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.untere_extremitaeten.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.untere_extremitaeten.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.untere_extremitaeten.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>
                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Weichteile:</Text>
                                    <Text style={styles.text_element}>Offen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.weichteile.offen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Geschlossen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.weichteile.geschlossen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Leicht:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.weichteile.leicht ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Mittel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.weichteile.mittel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schwer:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.verletzungen.weichteile.schwer ? "X" : " ")}</Text>
                                    </Text>
                                </View>

                            </View>

                            <Text style={styles.page_name}>Monitoring</Text>

                            <View style={styles.container1}>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>1.Zeit:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.monitoring.zeit_1}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>1.Puls:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.monitoring.puls_1}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>1.Blutdruck:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.monitoring.blutdruck_1}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>1.SpO2:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.monitoring.spo2_1}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>2.Zeit:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.monitoring.zeit_2}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>2.Puls:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.monitoring.puls_2}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>2.Blutdruck:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.monitoring.blutdruck_2}</Text>
                                    </Text>

                                </View>
                                <View style={styles.label_text_container}>
                                    <Text style={styles.label_name}>2.SpO2:
                                        <Text style={styles.text_element}> {datass === "" ? "" : datass.monitoring.spo2_2}</Text>
                                    </Text>

                                </View>
                            </View>

                            <Text style={styles.page_name}>Maßnahmen & Einsatzart</Text>

                            <View style={styles.container2}>

                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Maßnahmen:</Text>
                                    <Text style={styles.text_element}>Atemwege freimachen:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.atemwege_freimachen ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Larynxtubus:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.larynxtubus ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>O2 Gabe:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.o2_gabe ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Brille/Maske/Beutel:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.brille_maske_beutel ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>sonstiges ...siehe Text:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.sonstiges_siehe_text ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Herzdruckmassage:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.herzdruckmassage ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>AED:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.aed ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Wundversorgung:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.wundversorgung ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>HWS Fixierung:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.hws_fixierung ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>NA Nachforderung:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.na_nachforderung ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Seitenlage:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.seitenlage ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Oberkörper hoch/sitzend:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.oberkoerper_hoch_sitzend ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Flachlagerung:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.flachlagerung ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Schocklage:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.schocklage ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Ruhigstellung:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.ruhigstellung ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Absicherung:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.absicherung ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Einweisung RD:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.einweisung_rd ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Unterstützung RD:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.unterstuetzung_rd ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>NND abwartend:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.massnahmen.nnd_abwartend ? "X" : " ")}</Text>
                                    </Text>

                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Sonstiges:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.massnahmen_einsatzart.massnahmen.sonstiges}</Text>
                                        </Text>

                                    </View>
                                </View>

                                <View style={styles.horizontal_line} />
                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Bei AED: Anzahl Schocks:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.massnahmen_einsatzart.bei_aed_anzahl_schocks}</Text>
                                        </Text>
                                    </View>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Bei O2: Gegebene Liter/min:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.massnahmen_einsatzart.bei_o2_gegebene_liter_min}</Text>
                                        </Text>
                                    </View>

                                </View>

                                <View style={styles.horizontal_line} />

                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Einsatzart:</Text>
                                    <Text style={styles.text_element}>Verkehrsunfall:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.verkehrsunfall ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Chirurgischer Notfall:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.chirurgischer_notfall ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Internistischer Notfall:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.internistischer_notfall ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Reanimation:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.reanimation ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Infektionseinsatz:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.infektionseinsatz ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Paediatrischer Notfall:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.paediatrischer_notfall ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Arbeitsunfall:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.arbeitsunfall ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Gynäkologischer Notfall:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.gynaekologischer_notfall ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Fehleinsatz ..siehe Protokoll Fehleinsatz..:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.einsatzart.fehleinsatz_siehe_protokoll_fehleinsatz ? "X" : " ")}</Text>
                                    </Text>


                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Sonstiges:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.massnahmen_einsatzart.einsatzart.sonstiges}</Text>
                                        </Text>

                                    </View>
                                </View>

                                <View style={styles.horizontal_line} />

                                <View style={styles.under_container2}>
                                    <Text style={styles.label_name}>Weitere beteiligte Einsatzkräfte:</Text>
                                    <Text style={styles.text_element}>Feuerwehr:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.feuerwehr ? "X" : " ")}</Text>
                                    </Text>
                                    <Text style={styles.text_element}>Polizei:
                                        <Text style={styles.check_box}>{datass === "" ? "" : (datass.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.polizei ? "X" : " ")}</Text>
                                    </Text>

                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Sonstiges:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.massnahmen_einsatzart.weitere_beteiligte_einsatzkraefte.sonstiges}</Text>
                                        </Text>

                                    </View>
                                </View>

                                <View style={styles.horizontal_line} />

                                <View style={styles.under_container2}>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Übergabe an:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.massnahmen_einsatzart.uebergabe_an}</Text>
                                        </Text>
                                    </View>
                                    <View style={styles.label_text_container}>
                                        <Text style={styles.label_name}>Freitext:
                                            <Text style={styles.text_element}> {datass === "" ? "" : datass.massnahmen_einsatzart.freitext}</Text>
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>

                <button id="save_finished_protocol" onClick={save_finished_pro} className="vorschau_body_button"><Save />Als fertiges Protokoll speichern</button>

            </div>
        </div>
    );
}
