import "./topbar.css"
import { Menu, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import axios from "axios";

export default function Topbar({ datas, currentPage }) {
    const navigate = useNavigate();

    const pub_token = useRef();
    const user_u = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token');
            const isLoggedIn = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn');


            if (isLoggedIn === 'true' && token) {
                const decodedToken = await decodeToken(token);
                user_u.current = await get_user(decodedToken.userId)

                pub_token.current = decodedToken;

                console.log(new Date(pub_token.current.exp * 1000) + "     :     " + pub_token.current.userId)
                if (typeof decodedToken === 'undefined') {
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_token');
                    localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'false');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                    navigate('/');
                    return;
                }

                //document.getElementById("name").textContent = user_u.current.name;
                /*
                console.log(" dec :  " + new Date(decodedToken.exp * 1000))
                console.log("login page isLoggedIn === 'true' && token")

                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_token', await encodeToken(decodedToken.userId));
                localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'true');

                console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token'));
                console.log(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn'));*/



            } else {
                navigate('/');
            }
        }
        fetchData();
    }, [])

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
                //alert(response.data)
            } else {
                return response.data;
            }


        } catch (error) {
            console.log(error);
        }
    };

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

    async function nav() {
        const userResponse = window.confirm("Sind Sie sicher, dass Sie sich abmelden möchten?");

        if (userResponse) {
            localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_token');
            localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'false');
            localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
            localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');

            navigate('/');

        } else {

        }
    }

    const open_side_bar = () => {
        document.getElementById("sidebar_mc_id").style.width = "250px";
        document.getElementById("sidebar_mc_id").style.border = "2px solid rgb(151, 151, 151)";
        check_color();
    }

    const check_color = () => {
        if (currentPage !== "einstellungen" && currentPage !== "benutzer_verwaltung") {
            console.log(currentPage);
            //document.getElementById("einsatzdaten_a").style.color = "red";
            //seite_1////////////////////////////////////////////////////////
            if (datas.einsatzdaten.alarmschluessel !== null) {

                if (!datas.einsatzdaten.alarmschluessel.match('^[123][0-9]{3}[NBnb]?$')) {
                    document.getElementById("einsatzdaten_a").style.color = "red";
                }
            } else {
                document.getElementById("einsatzdaten_a").style.color = "red";
            }


            if (datas.einsatzdaten.keine_auftragnummer !== null) {
                if (!datas.einsatzdaten.keine_auftragnummer) {
                    if (datas.einsatzdaten.auftragsnummer !== null) {

                        if (!datas.einsatzdaten.auftragsnummer.match('^([0-9]+)$')) {
                            document.getElementById("einsatzdaten_a").style.color = "red";
                        }
                    } else {
                        document.getElementById("einsatzdaten_a").style.color = "red";
                    }
                }
            } else {
                if (datas.einsatzdaten.auftragsnummer !== null) {

                    if (!datas.einsatzdaten.auftragsnummer.match('^([0-9]+)$')) {
                        document.getElementById("einsatzdaten_a").style.color = "red";
                    }
                } else {
                    document.getElementById("einsatzdaten_a").style.color = "red";
                }
            }

            if (datas.einsatzdaten.alarmzeit !== null) {

                if (!datas.einsatzdaten.alarmzeit.match(/^(000[1-9]|00[1-9]\d|0[1-9]\d\d|100\d|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|[1-9]\d{4}|1\d{5}|2[0-6]\d{4}|27[0-4]\d{3}|275[0-6]\d{2}|2757[0-5]\d|275760)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])T(0\d|1\d|2[0-4]):(0\d|[1-5]\d)(?::(0\d|[1-5]\d))?(?:.(00\d|0[1-9]\d|[1-9]\d{2}))?$/gm)) {
                    document.getElementById("einsatzdaten_a").style.color = "red";
                }
            } else {
                document.getElementById("einsatzdaten_a").style.color = "red";
            }


            if (datas.einsatzdaten.ankunft_hvo !== null) {

                if (!datas.einsatzdaten.ankunft_hvo.match('^[0-9][0-9]:[0-9][0-9]$')) {
                    document.getElementById("einsatzdaten_a").style.color = "red";
                }
            } else {
                document.getElementById("einsatzdaten_a").style.color = "red";
            }

            if (datas.einsatzdaten.einsatzende !== null) {

                if (!datas.einsatzdaten.einsatzende.match('^[0-9][0-9]:[0-9][0-9]$')) {
                    document.getElementById("einsatzdaten_a").style.color = "red";
                }
            } else {
                document.getElementById("einsatzdaten_a").style.color = "red";
            }
            //seite_2///////////////////////////////////////////////////////////////////////
            const map_array1 = Object.values(datas.beteiligte_einsatzkraefte.eingesetzte_fahrzeuge);

            if (map_array1.includes(null)) {
                document.getElementById("beteiligte_einsatzkraefte_a").style.color = "red";
            } else {
                if (map_array1.includes(true)) {

                } else {
                    document.getElementById("beteiligte_einsatzkraefte_a").style.color = "red";
                }
            }

            const map_array2 = Object.values(datas.beteiligte_einsatzkraefte.einsatzkraefte_am_patienten);

            if (map_array2.includes(null)) {
                document.getElementById("beteiligte_einsatzkraefte_a").style.color = "red";
            } else {
                if (map_array2.includes(true)) {

                } else {
                    document.getElementById("beteiligte_einsatzkraefte_a").style.color = "red";
                }
            }

            //patient/////////////////////////////////////////////////////////////////////////
            if (datas.patient.geschlecht !== null) {

                if (datas.patient.geschlecht === "unbekannt") {
                    document.getElementById("patient_a").style.color = "red";
                }
            } else {
                document.getElementById("patient_a").style.color = "red";
            }

            if (datas.patient.alter !== null) {

                if (!datas.patient.alter.match('^([0-9]+)$')) {
                    document.getElementById("patient_a").style.color = "red";
                }
            } else {
                document.getElementById("patient_a").style.color = "red";
            }

            //anamnese/////////////////////////////////////////////////////////////////////////anamnese_a
            if (datas.anamnese.atemwege !== null) {

                if (datas.anamnese.atemwege === "") {
                    document.getElementById("anamnese_a").style.color = "red";
                }
            } else {
                document.getElementById("anamnese_a").style.color = "red";
            }

            const map_array21 = Object.values(datas.anamnese.belueftung);

            if (map_array21.includes(null)) {
                document.getElementById("anamnese_a").style.color = "red";
            } else {
                if (map_array21.includes(true) || datas.anamnese.belueftung.sonstiges !== "") {

                } else {
                    document.getElementById("anamnese_a").style.color = "red";
                }
            }

            const map_array22 = Object.values(datas.anamnese.puls);

            if (map_array22.includes(null)) {
                document.getElementById("anamnese_a").style.color = "red";
            } else {
                if (map_array22.includes(true)) {

                } else {
                    document.getElementById("anamnese_a").style.color = "red";
                }
            }

            const map_array23 = Object.values(datas.anamnese.haut);

            if (map_array23.includes(null)) {
                document.getElementById("anamnese_a").style.color = "red";
            } else {
                if (map_array23.includes(true)) {

                } else {
                    document.getElementById("anamnese_a").style.color = "red";
                }
            }

            //messwerte////////////////////////////////////////////////////////////////

            if (datas.messwerte.keine_messwerte !== null) {
                if (!datas.messwerte.keine_messwerte) {

                    if (datas.messwerte.puls !== null) {

                        if (datas.messwerte.puls.match("^([0-9]+)$") || datas.messwerte.puls === "") {

                        } else {
                            document.getElementById("messwerte_a").style.color = "red";
                        }
                    }

                    if (datas.messwerte.blutdruck !== null) {

                        if (datas.messwerte.blutdruck.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || datas.messwerte.blutdruck === "") {

                        } else {
                            document.getElementById("messwerte_a").style.color = "red";
                        }
                    }

                    if (datas.messwerte.spo2 !== null) {

                        if (datas.messwerte.spo2.match("^([0-9]+)$") || datas.messwerte.spo2 === "") {

                        } else {
                            document.getElementById("messwerte_a").style.color = "red";
                        }
                    }

                }
            } else {

                if (datas.messwerte.puls !== null) {

                    if (datas.messwerte.puls.match("^([0-9]+)$") || datas.messwerte.puls === "") {

                    } else {
                        document.getElementById("messwerte_a").style.color = "red";
                    }
                }

                if (datas.messwerte.blutdruck !== null) {

                    if (datas.messwerte.blutdruck.match('^[0-9]{2,3}\\/[0-9]{2,3}$') || datas.messwerte.blutdruck === "") {

                    } else {
                        document.getElementById("messwerte_a").style.color = "red";
                    }
                }

                if (datas.messwerte.spo2 !== null) {

                    if (datas.messwerte.spo2.match("^([0-9]+)$") || datas.messwerte.spo2 === "") {

                    } else {
                        document.getElementById("messwerte_a").style.color = "red";
                    }
                }
            }

            //neurologie///////////////////////////////////////////////////////////////

            if (datas.neurologie.blutzucker !== null) {

                if (datas.neurologie.blutzucker.match("^([0-9]+|low|high)$") || datas.neurologie.blutzucker === "") {

                } else {
                    document.getElementById("neurologie_a").style.color = "red";
                }
            }

            if (datas.neurologie.schmerzskala_0_10 !== null) {

                if (datas.neurologie.schmerzskala_0_10.match("^([0-9]|10)$") || datas.neurologie.schmerzskala_0_10 === "") {

                } else {
                    document.getElementById("neurologie_a").style.color = "red";
                }
            }

            //monitoring////////////////////////////////////////////////////////////////

            if (datas.monitoring.puls_1 !== null) {

                if (datas.monitoring.puls_1.match('^([0-9]+)$') || datas.monitoring.puls_1 === "") {

                } else {
                    document.getElementById("monitoring_a").style.color = "red";
                }
            }

            if (datas.monitoring.blutdruck_1 !== null) {

                if (datas.monitoring.blutdruck_1.match('^[0-9]{1,3}\\/[0-9]{1,3}$') || datas.monitoring.blutdruck_1 === "") {

                } else {
                    document.getElementById("monitoring_a").style.color = "red";
                }
            }

            if (datas.monitoring.spo2_1 !== null) {

                if (datas.monitoring.spo2_1.match('^([0-9]+)$') || datas.monitoring.spo2_1 === "") {

                } else {
                    document.getElementById("monitoring_a").style.color = "red";
                }
            }



            if (datas.monitoring.puls_2 !== null) {

                if (datas.monitoring.puls_2.match('^([0-9]+)$') || datas.monitoring.puls_2 === "") {

                } else {
                    document.getElementById("monitoring_a").style.color = "red";
                }
            }

            if (datas.monitoring.blutdruck_2 !== null) {

                if (datas.monitoring.blutdruck_2.match('^[0-9]{1,3}\\/[0-9]{1,3}$') || datas.monitoring.blutdruck_2 === "") {

                } else {
                    document.getElementById("monitoring_a").style.color = "red";
                }
            }

            if (datas.monitoring.spo2_2 !== null) {

                if (datas.monitoring.spo2_2.match('^([0-9]+)$') || datas.monitoring.spo2_2 === "") {

                } else {
                    document.getElementById("monitoring_a").style.color = "red";
                }
            }

            //massnahmen und einsatzart//////////////////////////////////////////////////////////////////

            if (datas.massnahmen_einsatzart.bei_aed_anzahl_schocks !== null) {

                if (datas.massnahmen_einsatzart.bei_aed_anzahl_schocks.match('^([0-9]+)$') || datas.massnahmen_einsatzart.bei_aed_anzahl_schocks === "") {

                } else {
                    document.getElementById("massnahmen_einsatzart_a").style.color = "red";
                }
            }

            if (datas.massnahmen_einsatzart.bei_o2_gegebene_liter_min !== null) {

                if (datas.massnahmen_einsatzart.bei_o2_gegebene_liter_min.match('^([0-9]+)$') || datas.massnahmen_einsatzart.bei_o2_gegebene_liter_min === "") {

                } else {
                    document.getElementById("massnahmen_einsatzart_a").style.color = "red";
                }
            }

            if (datas.massnahmen_einsatzart.uebergabe_an !== null) {

                if (datas.massnahmen_einsatzart.uebergabe_an === "") {
                    document.getElementById("massnahmen_einsatzart_a").style.color = "red";
                }
            } else {
                document.getElementById("massnahmen_einsatzart_a").style.color = "red";
            }

        }

        document.getElementById(currentPage + "_a").style.color = "blue";

    }

    return (
        <div className="topbar_mc">
            <Menu className="topbar_mc_left" onClick={open_side_bar} />

            <img className="topbar_mc_middle_logo" src="assets/red_cross.png" />

            <div style={{ display: "flex", alignItems: "center", fontSize: "18px", fontWeight: "bold" }}>
                
                <Logout onClick={() => nav()} className="topbar_mc_right" />
            </div>
        </div>
    );
}