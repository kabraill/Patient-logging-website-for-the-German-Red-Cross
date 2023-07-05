import "./neurologie.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Neurologie() {

    const navigate = useNavigate();

    const [datasss, setDatasss] = useState();

    const Bewusstsein = useRef();
    const Blutzucker = useRef();
    const isChecked_PupilleLinks = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_PupilleRechts = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const Schmerzen = useRef();
    const Schmerzskala = useRef();

    const Blutzucker_l = useRef();
    const Schmerzskala_l = useRef();

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
                    setDatasss(datas);

                    console.log("datasssssssssssssssssssssssss : " + datas);

                    if (datas.neurologie.bewusstsein !== null) {
                        Bewusstsein.current.value = datas.neurologie.bewusstsein;

                    }

                    if (datas.neurologie.blutzucker !== null) {
                        Blutzucker.current.value = datas.neurologie.blutzucker;
                        if (Blutzucker.current.value.match("^([0-9]+|low|high)$") || Blutzucker.current.value === "") {
                            Blutzucker_l.current.style.color = "black";
                        } else {
                            Blutzucker_l.current.style.color = "red";
                        }
                    } else {
                        Blutzucker_l.current.style.color = "black";
                    }

                    if (datas.neurologie.pupille_links.eng !== null) {
                        isChecked_PupilleLinks.current[0].current.checked = datas.neurologie.pupille_links.eng;
                    }

                    if (datas.neurologie.pupille_links.mitte !== null) {
                        isChecked_PupilleLinks.current[1].current.checked = datas.neurologie.pupille_links.mitte;
                    }

                    if (datas.neurologie.pupille_links.weit !== null) {
                        isChecked_PupilleLinks.current[2].current.checked = datas.neurologie.pupille_links.weit;
                    }

                    if (datas.neurologie.pupille_links.keine_lichtreflexe !== null) {
                        isChecked_PupilleLinks.current[3].current.checked = datas.neurologie.pupille_links.keine_lichtreflexe;
                    }

                    if (datas.neurologie.pupille_links.entrundet !== null) {
                        isChecked_PupilleLinks.current[4].current.checked = datas.neurologie.pupille_links.entrundet;
                    }

                    ////////////////////////////

                    if (datas.neurologie.pupille_rechts.eng !== null) {
                        isChecked_PupilleRechts.current[0].current.checked = datas.neurologie.pupille_rechts.eng;
                    }

                    if (datas.neurologie.pupille_rechts.mitte !== null) {
                        isChecked_PupilleRechts.current[1].current.checked = datas.neurologie.pupille_rechts.mitte;
                    }

                    if (datas.neurologie.pupille_rechts.weit !== null) {
                        isChecked_PupilleRechts.current[2].current.checked = datas.neurologie.pupille_rechts.weit;
                    }

                    if (datas.neurologie.pupille_rechts.keine_lichtreflexe !== null) {
                        isChecked_PupilleRechts.current[3].current.checked = datas.neurologie.pupille_rechts.keine_lichtreflexe;
                    }

                    if (datas.neurologie.pupille_rechts.entrundet !== null) {
                        isChecked_PupilleRechts.current[4].current.checked = datas.neurologie.pupille_rechts.entrundet;
                    }

                    ///////////////////////////////////////

                    if (datas.neurologie.schmerzen !== null) {
                        Schmerzen.current.value = datas.neurologie.schmerzen;

                    }

                    if (datas.neurologie.schmerzskala_0_10 !== null) {
                        Schmerzskala.current.value = datas.neurologie.schmerzskala_0_10;

                        if (Schmerzskala.current.value.match("^([0-9]|10)$") || Schmerzskala.current.value === "") {
                            Schmerzskala_l.current.style.color = "black";
                        } else {
                            Schmerzskala_l.current.style.color = "red";
                        }
                    } else {
                        Schmerzskala_l.current.style.color = "black";
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


    const save_datas_neurologie = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_neurologie",
                {
                    id: pub_draft_protocol_token.current.obj,
                    instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),
                    Bewusstsein_a: Bewusstsein.current.value,
                    Blutzucker_a: Blutzucker.current.value,
                    /////////////////////////////////////////////////////////////
                    isChecked_PupilleLinks_eng_a: isChecked_PupilleLinks.current[0].current.checked,
                    isChecked_PupilleLinks_mittel_a: isChecked_PupilleLinks.current[1].current.checked,
                    isChecked_PupilleLinks_weit_a: isChecked_PupilleLinks.current[2].current.checked,
                    isChecked_PupilleLinks_keine_licht_reflexe_a: isChecked_PupilleLinks.current[3].current.checked,
                    isChecked_PupilleLinks_entrundet_a: isChecked_PupilleLinks.current[4].current.checked,
                    /////////////////////////////////////////////////////////////
                    isChecked_PupilleRechts_eng_a: isChecked_PupilleRechts.current[0].current.checked,
                    isChecked_PupilleRechts_mittel_a: isChecked_PupilleRechts.current[1].current.checked,
                    isChecked_PupilleRechts_weit_a: isChecked_PupilleRechts.current[2].current.checked,
                    isChecked_PupilleRechts_keine_licht_reflexe_a: isChecked_PupilleRechts.current[3].current.checked,
                    isChecked_PupilleRechts_entrundet_a: isChecked_PupilleRechts.current[4].current.checked,
                    //////////////////////////////////////////////////////////
                    Schmerzen_a: Schmerzen.current.value,
                    Schmerzskala_a: Schmerzskala.current.value
                }
            );

            console.log("neurologie : -------------------------------------------------------------------------------------------------------------------" + response.data);
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
        const save = async () => {
            await save_datas_neurologie();
        }
        await save();
        navigate('/verletzungen');
    }

    const nav_previous = async () => {
        const save = async () => {
            await save_datas_neurologie();
        }
        await save();
        navigate('/messwerte');
    }

    const handleInputChange_Blutzucker = (e) => {

        if (e.target.value.match("^([0-9]+|low|high)$") || e.target.value === "") {
            Blutzucker_l.current.style.color = "black";
        } else {
            Blutzucker_l.current.style.color = "red";
        }
    }

    const handleInputChange_Schmerzskala = (e) => {

        if (e.target.value.match("^([0-9]|10)$") || e.target.value === "") {
            Schmerzskala_l.current.style.color = "black";
        } else {
            Schmerzskala_l.current.style.color = "red";
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
        return (<div style={{ pointerEvents: "none" }} className="neurologie">
            <Sidebar currentPage="neurologie" />
            <Topbar  />
            <div className="neurologie_body">
                <span className="neurologie_body_title">
                    Seite wird geladen
                </span>
            </div>
        </div>); // Render a loading indicator while fetching data
    }

    return (
        <div className="neurologie">
            <Sidebar currentPage="neurologie" save_a={save_datas_neurologie} datas={datasss} 
            del={delete_d} instanz_erstellen={instanz_erstellen} />
            <Topbar currentPage="neurologie" datas={datasss}/>
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="neurologie_body">
                <span className="neurologie_body_title">
                    Neurologie
                </span>
                <div className="neurologie_body_components">

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Bewusstsein: *
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <select id="select_custom" ref={Bewusstsein}
                                className="neurologie_body_components_line_right_singleselect">
                                <option id="option_custom" value="orientiert">Orientiert</option>
                                <option id="option_custom" value="desorientiert">Desorientiert</option>
                                <option id="option_custom" value="getruebt">getrübt</option>
                                <option id="option_custom" value="bewusstlos">Bewusstlos</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="neurologie_body_components_line">
                        <span ref={Blutzucker_l} className="neurologie_body_components_line_label">
                            Blutzucker:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <input type="text"
                                className="neurologie_body_components_line_right1_txt"
                                ref={Blutzucker}
                                onChange={handleInputChange_Blutzucker}
                                placeholder="Z.B 80 "
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Pupille links:
                        </span>
                        <div className="neurologie_body_components_line_right3">
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_eng"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[0]}
                                />
                                <label htmlFor="neurologie_pupille_links_eng">Eng</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_mittel"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[1]}
                                />
                                <label htmlFor="neurologie_pupille_links_mittel">Mittel</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_weit"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[2]}
                                />
                                <label htmlFor="neurologie_pupille_links_weit">Weit</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_keine_lichtreflexe"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[3]}
                                />
                                <label htmlFor="neurologie_pupille_links_keine_lichtreflexe">keine Lichtreflexe</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_links_entrundet"
                                    type="checkbox"
                                    ref={isChecked_PupilleLinks.current[4]}
                                />
                                <label htmlFor="neurologie_pupille_links_entrundet">Entrundet</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Pupille Rechts:
                        </span>
                        <div className="neurologie_body_components_line_right3">
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_eng"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[0]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_eng">Eng</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_mittel"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[1]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_mittel">Mittel</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_weit"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[2]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_weit">Weit</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_keine_lichtreflexe"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[3]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_keine_lichtreflexe">keine Lichtreflexe</label>
                            </div>
                            <div className="neurologie_body_components_line_right3_multiselect">
                                <input
                                    id="neurologie_pupille_rechts_entrundet"
                                    type="checkbox"
                                    ref={isChecked_PupilleRechts.current[4]}
                                />
                                <label htmlFor="neurologie_pupille_rechts_entrundet">Entrundet</label>
                            </div>

                        </div>
                    </div>
                    <div className="horizontal-line"></div>

                    <div className="neurologie_body_components_line">
                        <span className="neurologie_body_components_line_label">
                            Schmerzen:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <select id="select_custom" ref={Schmerzen}
                                className="neurologie_body_components_line_right_singleselect">
                                <option id="option_custom" value="keine">Keine</option>
                                <option id="option_custom" value="leicht">Leicht</option>
                                <option id="option_custom" value="mittel">Mittel</option>
                                <option id="option_custom" value="stark">Stark</option>
                                <option id="option_custom" value="kolikartig">Kolikartig</option>
                            </select>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="neurologie_body_components_line">
                        <span ref={Schmerzskala_l} className="neurologie_body_components_line_label">
                            Schmerzskala 0-10:
                        </span>
                        <div className="neurologie_body_components_line_right1">
                            <input type="text"
                                className="neurologie_body_components_line_right1_txt"
                                ref={Schmerzskala}
                                onChange={handleInputChange_Schmerzskala}
                                placeholder="0 - 10"
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