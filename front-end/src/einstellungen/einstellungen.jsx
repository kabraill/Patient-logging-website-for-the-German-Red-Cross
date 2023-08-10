import "./einstellungen.css"

import Sidebar from "../sidebar/sidebar";
import Topbar from "../topbar/topbar";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Einstellungen() {

    const navigate = useNavigate();

    const [user_u, setUser_u] = useState();
    const [protocol_result, setProtocol_result] = useState([])


    const process_type = useRef("");

    const anwesende_mitarbeiter = useRef();

    const and_or = useRef("");
    const checkboxes = useRef([useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]);
    const values = useRef([useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]);

    const [erstellen_isVisible, setErstellen_isVisible] = useState(false);
    const [laden_isVisible, setLaden_isVisible] = useState(false);
    const [instance_isVisible, setInstance_isVisible] = useState(false);

    const [nicht_fertig_laden, setNicht_fertig_laden] = useState(false);
    const [offnen_n, setOffnen_n] = useState(false);
    const [fertig_erstellen, setFertig_erstellen] = useState(false);

    const pub_token = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token');
            const isLoggedIn = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn');



            if (isLoggedIn === 'true' && token) {
                const decodedToken = await decodeToken(token);
                setUser_u(await get_user(decodedToken.userId));
                pub_token.current = decodedToken;
                console.log(pub_token.current);
                console.log(new Date(pub_token.current.exp * 1000) + "     :     " + pub_token.current.userId)
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
                document.getElementById("main").style.pointerEvents = "auto";


            } else {
                navigate('/');
            }
        }
        fetchData();
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

    const encodeToken = async (userId) => {
        console.log("userid:    " + userId);
        try {
            const response = await axios.post("http://localhost:8800/user/encodeToken", {
                id: userId
            })

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

    const erstellen_laden_main = async () => {
        const erstellen_laden = async () => {
            if (anwesende_mitarbeiter.current.value === "") {
                alert("Schreiben Sie bitte die Namen der anwesenden Mitarbeiter");
            } else if (!anwesende_mitarbeiter.current.value.match(/^(\w+-)*\w+$/)) {
                alert("Der Text stimmt nicht mit dem angegebenen Beispiel überein");
            } else {
                let namesMap;
                if (anwesende_mitarbeiter.current.value.includes('-')) {
                    const namesArray = anwesende_mitarbeiter.current.value.split('-');
                    namesMap = new Map(namesArray.map(name => [name, null]));
                    console.log(namesMap);
                } else {
                    // Only one name in the text without a hyphen
                    const name = anwesende_mitarbeiter.current.value.trim();
                    namesMap = new Map([[name, null]]);
                    console.log(namesMap);
                }

                const names_map_object = Object.fromEntries(namesMap);

                const creation_datee = await getTimeFromServer();
                const del_time = new Date(creation_datee);
                del_time.setMonth(del_time.getMonth() + 2);
                const user_id = pub_token.current.userId;

                try {
                    const response = await axios.post(
                        "http://localhost:8800/protocol_draft/create",
                        {
                            content: [{
                                finished: "nein",
                                creation_date: creation_datee,
                                created_by: user_id,
                                present_users_emergency: [],
                                delete_time: del_time,

                                einsatzdaten: {
                                    special_marking_name: null,
                                    special_marking_color: null,
                                    alarmschluessel: "",
                                    keine_auftragnummer: null,
                                    auftragsnummer: "",
                                    einsatzort: "",
                                    alarmzeit: "",
                                    ankunft_hvo: null,
                                    ankunft_rtw_nef: null,
                                    einsatzende: null
                                },
                                beteiligte_einsatzkraefte: {
                                    eingesetzte_fahrzeuge: {
                                        privat_pkw: null,
                                        feuerwehr_mtw: null,
                                        z_58_19_2: null
                                    },
                                    einsatzkraefte_am_patienten: names_map_object,
                                    einsatzkraefte_vor_ort: names_map_object
                                },
                                patient: {
                                    geschlecht: null,
                                    alter: null
                                },
                                anamnese: {
                                    atemwege: null,
                                    belueftung: {
                                        unauffaellig: null,
                                        zyanose: null,
                                        rasseln: null,
                                        schnappatmung: null,
                                        atemnot: null,
                                        hyperventillation: null,
                                        atemstillstand: null,
                                        sonstiges: null
                                    },
                                    puls: {
                                        regelmaessig: null,
                                        unregelmaessig: null,
                                        gut_tastbar: null,
                                        schlecht_tastbar: null,
                                        nicht_tastbar: null
                                    },
                                    haut: {
                                        rosig: null,
                                        blass: null,
                                        blau: null,
                                        rot: null,
                                        warm: null,
                                        kalt: null
                                    }
                                },
                                messwerte: {
                                    puls: null,
                                    blutdruck: null,
                                    spo2: null,
                                    keine_messwerte: null
                                },
                                neurologie: {
                                    bewusstsein: null,
                                    blutzucker: null,
                                    pupille_links: {
                                        eng: null,
                                        mitte: null,
                                        weit: null,
                                        keine_lichtreflexe: null,
                                        entrundet: null
                                    },
                                    pupille_rechts: {
                                        eng: null,
                                        mitte: null,
                                        weit: null,
                                        keine_lichtreflexe: null,
                                        entrundet: null
                                    },
                                    schmerzen: null,
                                    schmerzskala_0_10: null
                                },
                                verletzungen: {
                                    Schaedel_Hirn: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    gesicht: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    hws: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    thorax: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    abdomen: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    bws_lws: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    becken: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    obere_extremitaeten: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    untere_extremitaeten: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    },
                                    weichteile: {
                                        offen: null,
                                        geschlossen: null,
                                        leicht: null,
                                        mittel: null,
                                        schwer: null
                                    }
                                },
                                monitoring: {
                                    zeit_1: null,
                                    puls_1: null,
                                    blutdruck_1: null,
                                    spo2_1: null,
                                    zeit_2: null,
                                    puls_2: null,
                                    blutdruck_2: null,
                                    spo2_2: null
                                },
                                massnahmen_einsatzart: {
                                    massnahmen: {
                                        atemwege_freimachen: null,
                                        larynxtubus: null,
                                        o2_gabe: null,
                                        brille_maske_beutel: null,
                                        sonstiges_siehe_text: null,
                                        herzdruckmassage: null,
                                        aed: null,
                                        wundversorgung: null,
                                        hws_fixierung: null,
                                        na_nachforderung: null,
                                        seitenlage: null,
                                        oberkoerper_hoch_sitzend: null,
                                        flachlagerung: null,
                                        schocklage: null,
                                        ruhigstellung: null,
                                        absicherung: null,
                                        einweisung_rd: null,
                                        unterstuetzung_rd: null,
                                        nnd_abwartend: null,
                                        sonstiges: null
                                    },
                                    bei_aed_anzahl_schocks: null,
                                    bei_o2_gegebene_liter_min: null,
                                    einsatzart: {
                                        verkehrsunfall: null,
                                        chirurgischer_notfall: null,
                                        internistischer_notfall: null,
                                        reanimation: null,
                                        infektionseinsatz: null,
                                        paediatrischer_notfall: null,
                                        arbeitsunfall: null,
                                        gynaekologischer_notfall: null,
                                        fehleinsatz_siehe_protokoll_fehleinsatz: null,
                                        sonstiges: null
                                    },
                                    weitere_beteiligte_einsatzkraefte: {
                                        feuerwehr: null,
                                        polizei: null,
                                        sonstiges: null
                                    },
                                    uebergabe_an: null,
                                    freitext: ""
                                }
                            }]
                        }
                    );

                    localStorage.setItem('deutsches_rottes_kreuz_herrenberg_draft_protocol', response.data);
                    localStorage.setItem('deutsches_rottes_kreuz_herrenberg_instance', "0");
                    navigate("/einsatzdaten");

                } catch (error) {
                    console.log(error);
                }
            }

        }

        await erstellen_laden();
    };

    const savee = () => {

    };

    function handleOnChange_process(event, type) {
        process_type.current = event.target.value;

        if (type === "a") {
            setErstellen_isVisible(true)
            setLaden_isVisible(false)

        }

        if (type === "b" || type === "c") {
            setLaden_isVisible(true)
            setErstellen_isVisible(false)

            if (type === "b") {
                setNicht_fertig_laden(true);
                setOffnen_n(true);
                setFertig_erstellen(false);
                setProtocol_result([]);

            } else if (type === "c") {
                setNicht_fertig_laden(false);
                setOffnen_n(false);
                setFertig_erstellen(true);
                setProtocol_result([]);
            }
        }

        if (type === "b") {
            setInstance_isVisible(true)
        } else {
            setInstance_isVisible(false)
        }
    }

    const laden = async () => {
        const laden_sub = async () => {

            let conditions = {
                einsatzdaten: {},
                massnahmen_einsatzart: {}
            }

            let permissions = []

            if (user_u.permission[0] === "Benutzer-Administrator") {
                permissions.push("Normaler-Benutzer");
            } else if (user_u.permission[0] === "Organisation-Administrator") {
                permissions.push("Normaler-Benutzer");
                permissions.push("Benutzer-Administrator");

            } else if (user_u.permission[0] === "Global-Admin") {
                permissions.push("Normaler-Benutzer");
                permissions.push("Benutzer-Administrator");
                permissions.push("Organisation-Administrator");
                permissions.push("Global-Admin");
            }

            conditions.permission_n = permissions;
            conditions.process = process_type.current;
            conditions.user_idd = user_u._id;

            conditions.type = and_or.current;

            if (checkboxes.current[0].current.checked == true) {
                conditions.id = values.current[0].current.value;
            }

            if (typeof checkboxes.current[1].current !== 'undefined' && checkboxes.current[1].current !== null && checkboxes.current[1].current.checked == true) {
                conditions.instance = values.current[1].current.value;
            }

            if (checkboxes.current[2].current.checked == true) {
                conditions.einsatzdaten.alarmschluessel = values.current[2].current.value;
            }

            if (checkboxes.current[3].current.checked == true) {
                conditions.einsatzdaten.auftragsnummer = values.current[3].current.value;
            }

            if (checkboxes.current[4].current.checked == true) {
                conditions.einsatzdaten.einsatzort = values.current[4].current.value;
            }

            if (checkboxes.current[5].current.checked == true) {
                conditions.einsatzdaten.alarmzeit = values.current[5].current.value;
            }

            if (checkboxes.current[6].current.checked == true) {
                conditions.massnahmen_einsatzart.freitext = values.current[6].current.value;
            }

            console.log(conditions)
            try {
                const response = await axios.post(
                    "http://localhost:8800/protocol_draft/load", conditions)


                if (typeof (response.data) === "string") {
                    setProtocol_result([]);
                    alert(response.data);
                } else {
                    setProtocol_result(response.data)
                }
            } catch (error) {
                alert(error.response.data);
            }

        }

        await laden_sub();

    }

    async function nnicht_fertig_ladenn() {
        async function nnicht_fertig_ladennn() {
            let permissions = []

            if (user_u.permission[0] === "Benutzer-Administrator") {
                permissions.push("Normaler-Benutzer");
            } else if (user_u.permission[0] === "Organisation-Administrator") {
                permissions.push("Normaler-Benutzer");
                permissions.push("Benutzer-Administrator");

            } else if (user_u.permission[0] === "Global-Admin") {
                permissions.push("Normaler-Benutzer");
                permissions.push("Benutzer-Administrator");
                permissions.push("Organisation-Administrator");
                permissions.push("Global-Admin");
            }

            try {
                const response = await axios.post(
                    "http://localhost:8800/protocol_draft/nicht_fertig_laden", {
                    permission_n: permissions,
                    idd: user_u._id
                })


                if (typeof (response.data) === "string") {
                    setProtocol_result([]);
                    alert(response.data);
                } else {
                    setProtocol_result(response.data)
                }
            } catch (error) {
                alert(error.response.data);
            }
        }

        await nnicht_fertig_ladennn();
    }

    async function eigene_ladenn() {
        async function eeigene_ladenn() {

            try {
                const response = await axios.post(
                    "http://localhost:8800/protocol_draft/eigene_laden", {
                    process: process_type.current,
                    idd: user_u._id
                })


                if (typeof (response.data) === "string") {
                    setProtocol_result([]);
                    alert(response.data);
                } else {
                    setProtocol_result(response.data)
                }
            } catch (error) {
                alert(error.response.data);
            }
        }

        await eeigene_ladenn();
    }

    async function fertig_neu_erstellen() {
        async function ffertig_neu_erstellen() {
            if (document.getElementById("protocol_results").value === "") {
                alert("Sie müssen ein protokoll laden!")
                return;
            }
            let values = document.getElementById("protocol_results").value.split("zzzzzzzzzz");

            const creation_datee = await getTimeFromServer();
            const del_time = new Date(creation_datee);
            del_time.setMonth(del_time.getMonth() + 2);
            const user_id = pub_token.current.userId;

            try {

                const response = await axios.post(
                    "http://localhost:8800/protocol_finished/fertig_neu_erstellen",
                    {
                        creation_date: creation_datee,
                        created_by: user_id,
                        delete_time: del_time,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${values[0]}`,
                        },
                    }
                );

                if (response.data === "Protokoll wurde nicht gefunden!") {

                    alert("Protokoll wurde nicht gefunden!")
                    return;
                }

                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_draft_protocol', response.data);
                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_instance', parseInt(0));
                navigate("/einsatzdaten");

            } catch (error) {
                console.log(error);
            }

        }

        await ffertig_neu_erstellen();
    }


    return (
        <div id="main" style={{ pointerEvents: "none", minHeight: "800px" }} className="einstellungen">
            <Sidebar currentPage="einstellungen" save_a={savee} />
            <Topbar currentPage="einstellungen" />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";

            }} style={{ minHeight: "755px" }} className="einstellungen_body">
                <span className="einstellungen_body_title">
                    Einstellungen
                </span>
                <div className="einstellungen_body_components">
                    <div className="einstellungen_body_components_line">
                        <span className="einstellungen_body_components_line_label">
                            Was möchten Sie machen?
                        </span>
                        <div className="einstellungen_body_components_line_right">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    className="anamnese_body_components_line_right3_multiselect_radio"
                                    id="Neues_Draft_Protocol_erstellen"
                                    type="radio"
                                    name="process_type"
                                    value="Neues_Draft_Protocol_erstellen"
                                    onClick={(e) => handleOnChange_process(e, "a")} />
                                <label htmlFor="Neues_Draft_Protocol_erstellen">Neues Draft Protocol erstellen</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    className="anamnese_body_components_line_right3_multiselect_radio"
                                    id="Draft_Protocol_laden"
                                    type="radio"
                                    name="process_type"
                                    value="Draft_Protocol_laden"
                                    onClick={(e) => handleOnChange_process(e, "b")} />
                                <label htmlFor="Draft_Protocol_laden">Draft Protocol laden</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    className="anamnese_body_components_line_right3_multiselect_radio"
                                    id="Fertiges_Protocol_laden"
                                    type="radio"
                                    name="process_type"
                                    value="Fertiges_Protocol_laden"
                                    onClick={(e) => handleOnChange_process(e, "c")} />
                                <label htmlFor="Fertiges_Protocol_laden">Fertiges Protocol laden</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    {erstellen_isVisible && <div className="einstellungen_body_components_line">
                        <span className="einstellungen_body_components_line_label">
                            Neues Draft Protocol erstellen:
                        </span>
                        <div className="einstellungen_body_components_line_right">
                            <input type="text"
                                ref={anwesende_mitarbeiter}
                                className="einstellungen_body_components_line_right2_txt"
                                placeholder="Anwesende Mitarbeiter Z.B lea-tom-uwe-...." />

                            <button onClick={erstellen_laden_main} className="s1_body_buttons_btn_next">Erstellen</button>
                        </div>
                    </div>}


                    {laden_isVisible && <div className="einstellungen_body_components_line">
                        <span className="einstellungen_body_components_line_label">
                            Draft Protocol laden:
                        </span>

                        <div className="einstellungen_body_components_line_right">

                            <div className="einstellungen_body_components_line_right">
                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        id="protokoll_id"
                                        ref={checkboxes.current[0]} />
                                    <label htmlFor="protokoll_id">Protokoll Id</label>
                                    <input ref={values.current[0]} />
                                </div>

                                {instance_isVisible && <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        id="instanz_nummer"
                                        ref={checkboxes.current[1]} />
                                    <label htmlFor="instanz_nummer">Instanz Nummer</label>
                                    <input id="instance" ref={values.current[1]} />
                                </div>}

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        id="alarm_schlussel"
                                        ref={checkboxes.current[2]} />
                                    <label htmlFor="alarm_schlussel">Alarm Schlüssel</label>
                                    <input ref={values.current[2]} />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        id="auftrag_nummer"
                                        ref={checkboxes.current[3]} />
                                    <label htmlFor="auftrag_nummer">Auftrag Nummer</label>
                                    <input ref={values.current[3]} />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        id="einsatzort"
                                        ref={checkboxes.current[4]} />
                                    <label htmlFor="einsatzort">Einsatzort</label>
                                    <input ref={values.current[4]} />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        id="alarm_zeit_datum"
                                        ref={checkboxes.current[5]} />
                                    <label htmlFor="alarm_zeit_datum">Alarm-Zeit-Datum</label>
                                    <input ref={values.current[5]} type="datetime-local" />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        id="frei_text"
                                        ref={checkboxes.current[6]} />
                                    <label htmlFor="frei_text">Frei Text</label>
                                    <textarea ref={values.current[6]} />
                                </div>
                            </div>
                            <button onClick={laden} className="s1_body_buttons_btn_next">Laden</button>
                            {nicht_fertig_laden && <button onClick={nnicht_fertig_ladenn} id="nicht_fertig_laden" className="s1_body_buttons_btn_custom">Nicht fertige Protokolle Laden</button>}
                            <button onClick={eigene_ladenn} id="nicht_fertig_laden" className="s1_body_buttons_btn_custom">Meine Protokolle Laden</button>

                            <div className="einstellungen_body_components_line_right">
                                <select style={{ height: "75%", width: "100%", fontSize: "18px" }}
                                    id="protocol_results" >

                                    {protocol_result.map((protocol, index) => (

                                        <option style={{ color: protocol.einsatzdaten.special_marking_color }} className="patient_body_components_line_right_choice" key={protocol.id_d_decoded + "zzzzzzzzzz" + protocol.instance} value={protocol.id_d_decoded + "zzzzzzzzzz" + protocol.instance}>
                                            {"id: " + protocol.id_d + " instance: " + protocol.instance + " special-marking: " + protocol.einsatzdaten.special_marking_name}
                                        </option>

                                    ))}
                                </select>
                            </div>

                            {offnen_n && <button id="offnen_n" onClick={() => {
                                if (document.getElementById("protocol_results").value === "") {
                                    alert("Sie müssen ein protokoll laden und Öffnen!")
                                    return;
                                }
                                let values = document.getElementById("protocol_results").value.split("zzzzzzzzzz");




                                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_draft_protocol', values[0]);
                                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_instance', parseInt(values[1]));
                                navigate("/einsatzdaten");
                            }} className="s1_body_buttons_btn_next">Öffnen</button>}
                            {fertig_erstellen && <button onClick={fertig_neu_erstellen} id="fertig_erstellen" className="s1_body_buttons_btn_next">Erstellen</button>}
                        </div>
                    </div>}
                </div>


            </div>
        </div>

    );
}