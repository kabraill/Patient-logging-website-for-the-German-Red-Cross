import "./einstellungen.css"

import Sidebar from "../sidebar/sidebar";
import Topbar from "../topbar/topbar";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Einstellungen() {

    const navigate = useNavigate();
    const pub_token = useRef();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token');
            const isLoggedIn = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn');



            if (isLoggedIn === 'true' && token) {
                const decodedToken = await decodeToken(token);
                pub_token.current = decodedToken;
                console.log(pub_token.current);
                console.log(new Date(pub_token.current.exp * 1000) + "     :     " + pub_token.current.userId)
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

            } else {
                setLoading(false);
                navigate('/');
            }
        }
        fetchData();
    }, []);

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
            const creation_datee = await getTimeFromServer();
            const del_time = new Date(creation_datee);
            del_time.setMonth(del_time.getMonth() + 2);
            const user_id = pub_token.current.userId;

            try {
                const response = await axios.post(
                    "http://localhost:8800/protocol_draft/create",
                    {
                        content: [{
                            creation_date: creation_datee,
                            created_by: user_id,
                            present_users_emergency: [],
                            delete_time: del_time,

                            einsatzdaten: {
                                special_marking_name: null,
                                special_marking_color: null,
                                alarmschluessel: null,
                                keine_auftragnummer: null,
                                auftragsnummer: null,
                                einsatzort: null,
                                alarmzeit: null,
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
                                einsatzkraefte_am_patienten: {
                                    x: null,
                                    y: null,
                                    z: null
                                },
                                einsatzkraefte_vor_ort: {
                                    x: null,
                                    y: null,
                                    z: null
                                }
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
                                freitext: null
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

        await erstellen_laden();
    };

    const savee = () => {

    };

    if (loading) {
        return (<div style={{ pointerEvents: "none" }} className="einstellungen">
            <Sidebar currentPage="einstellungen" />
            <Topbar />
            <div className="einstellungen_body">
                <span className="einstellungen_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>);
    }

    return (
        <div className="einstellungen">
            <Sidebar currentPage="einstellungen" save_a={savee} />
            <Topbar currentPage="einstellungen"/>
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="einstellungen_body">
                <span className="einstellungen_body_title">
                    Einstellungen
                </span>
                <button onClick={erstellen_laden_main} className="s1_body_buttons_btn_next">erstellen</button>

            </div>
        </div>
    );
}