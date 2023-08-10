import "./anamnese.css"

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";

import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Anamnese() {

    const navigate = useNavigate();

    const [datasss, setDatasss] = useState();

    const atemwege = useRef("");
    const isChecked_belueftung = useRef([useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_puls = useRef([useRef(), useRef(), useRef(), useRef(), useRef()]);
    const isChecked_haut = useRef([useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]);
    const SonstigValue = useRef();

    const atemwege_l = useRef();
    const belueftung_l = useRef();
    const puls_l = useRef();
    const haut_l = useRef();

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
                    //console.log("datasssssssssssssssssssssssss : " + datas.anamnese.atemwege);
                    if (datas.anamnese.atemwege !== null) {
                        atemwege.current = datas.anamnese.atemwege
                        if (atemwege.current === "frei") {
                            document.getElementById("anamnese_atemwege_frei").checked = true;
                        } else if (atemwege.current === "verlegt") {
                            document.getElementById("anamnese_atemwege_verlegt").checked = true;
                        } else {

                        }

                        console.log("atemwege : " + datas.anamnese.atemwege)
                        if (datas.anamnese.atemwege !== "") {
                            atemwege_l.current.style.color = "black";
                        } else {
                            atemwege_l.current.style.color = "red";
                        }
                    } else {
                        atemwege_l.current.style.color = "red";
                    }
                    //////////////////////////////////////////////////////////////////////////////////


                    if (datas.anamnese.belueftung.unauffaellig !== null) {

                        isChecked_belueftung.current[0].current.checked = datas.anamnese.belueftung.unauffaellig;
                        console.log("belueftung.unauffaellig : " + isChecked_belueftung.current[0].current.checked)
                    }

                    if (datas.anamnese.belueftung.zyanose !== null) {
                        console.log("zyanose : " + datas.anamnese.belueftung.zyanose)
                        isChecked_belueftung.current[1].current.checked = datas.anamnese.belueftung.zyanose;
                    }

                    if (datas.anamnese.belueftung.rasseln !== null) {
                        console.log("rasseln : " + datas.anamnese.belueftung.rasseln)
                        isChecked_belueftung.current[2].current.checked = datas.anamnese.belueftung.rasseln;
                    }

                    if (datas.anamnese.belueftung.schnappatmung !== null) {
                        console.log("schnappatmung : " + datas.anamnese.belueftung.schnappatmung)
                        isChecked_belueftung.current[3].current.checked = datas.anamnese.belueftung.schnappatmung;
                    }

                    if (datas.anamnese.belueftung.atemnot !== null) {
                        console.log("belueftung.atemnot : " + datas.anamnese.belueftung.atemnot)
                        isChecked_belueftung.current[4].current.checked = datas.anamnese.belueftung.atemnot;
                    }

                    if (datas.anamnese.belueftung.hyperventillation !== null) {
                        console.log("belueftung.hyperventillation : " + datas.anamnese.belueftung.hyperventillation)
                        isChecked_belueftung.current[5].current.checked = datas.anamnese.belueftung.hyperventillation;
                    }

                    if (datas.anamnese.belueftung.atemstillstand !== null) {
                        console.log("belueftung.atemstillstand : " + datas.anamnese.belueftung.atemstillstand)
                        isChecked_belueftung.current[6].current.checked = datas.anamnese.belueftung.atemstillstand;
                    }

                    if (datas.anamnese.belueftung.sonstiges !== null) {
                        SonstigValue.current.value = datas.anamnese.belueftung.sonstiges;
                    }


                    const map_array1 = Object.values(datas.anamnese.belueftung);


                    console.log("ttttttttttttttttttttttttt : " + map_array1.length)
                    console.log("ttttttttttttttttttttttttt : " + datas.anamnese.belueftung.sonstiges)

                    if (map_array1.includes(null)) {
                        belueftung_l.current.style.color = "red";
                    } else {
                        if (map_array1.includes(true) || datas.anamnese.belueftung.sonstiges !== "") {
                            belueftung_l.current.style.color = "black"
                        } else {
                            belueftung_l.current.style.color = "red"
                        }
                    }


                    ////////////////////////////////////////////////////////////////////////////////////////////

                    if (datas.anamnese.puls.regelmaessig !== null) {
                        isChecked_puls.current[0].current.checked = datas.anamnese.puls.regelmaessig;
                    }

                    if (datas.anamnese.puls.unregelmaessig !== null) {
                        isChecked_puls.current[1].current.checked = datas.anamnese.puls.unregelmaessig;
                    }

                    if (datas.anamnese.puls.gut_tastbar !== null) {
                        isChecked_puls.current[2].current.checked = datas.anamnese.puls.gut_tastbar;
                    }

                    if (datas.anamnese.puls.schlecht_tastbar !== null) {
                        isChecked_puls.current[3].current.checked = datas.anamnese.puls.schlecht_tastbar;
                    }

                    if (datas.anamnese.puls.nicht_tastbar !== null) {
                        isChecked_puls.current[4].current.checked = datas.anamnese.puls.nicht_tastbar;
                    }

                    const map_array2 = Object.values(datas.anamnese.puls);

                    if (map_array2.includes(null)) {
                        puls_l.current.style.color = "red";
                    } else {
                        if (map_array2.includes(true)) {
                            puls_l.current.style.color = "black"
                        } else {
                            puls_l.current.style.color = "red"
                        }
                    }

                    ////////////////////////////////////////////////////////////////////////////////////////////

                    if (datas.anamnese.haut.rosig !== null) {
                        isChecked_haut.current[0].current.checked = datas.anamnese.haut.rosig;
                    }

                    if (datas.anamnese.haut.blass !== null) {
                        isChecked_haut.current[1].current.checked = datas.anamnese.haut.blass;
                    }

                    if (datas.anamnese.haut.blau !== null) {
                        isChecked_haut.current[2].current.checked = datas.anamnese.haut.blau;
                    }

                    if (datas.anamnese.haut.rot !== null) {
                        isChecked_haut.current[3].current.checked = datas.anamnese.haut.rot;
                    }

                    if (datas.anamnese.haut.warm !== null) {
                        isChecked_haut.current[4].current.checked = datas.anamnese.haut.warm;
                    }

                    if (datas.anamnese.haut.kalt !== null) {
                        isChecked_haut.current[5].current.checked = datas.anamnese.haut.kalt;
                    }

                    const map_array3 = Object.values(datas.anamnese.haut);

                    if (map_array3.includes(null)) {
                        haut_l.current.style.color = "red";
                    } else {
                        if (map_array3.includes(true)) {
                            haut_l.current.style.color = "black"
                        } else {
                            haut_l.current.style.color = "red"
                        }
                    }

                    document.getElementById("main").style.pointerEvents = "auto";
                } else {
                    navigate('/einstellungen');

                }
            } else {
                
                navigate('/');
            }

        };



        fetchData();



    }, []);

    const save_datas_anamnese = async () => {

        try {
            const response = await axios.put(
                "http://localhost:8800/protocol_draft/save_datas_anamnese",
                {
                    id: pub_draft_protocol_token.current.obj,
                    instance_index: parseInt(localStorage.getItem('deutsches_rottes_kreuz_herrenberg_instance')),

                    atemwege_a: atemwege.current,

                    belueftung_unauffaellig_a: isChecked_belueftung.current[0].current.checked,
                    belueftung_zyanose_a: isChecked_belueftung.current[1].current.checked,
                    belueftung_rasseln_a: isChecked_belueftung.current[2].current.checked,
                    belueftung_schnappatmung_a: isChecked_belueftung.current[3].current.checked,
                    belueftung_atemnot_a: isChecked_belueftung.current[4].current.checked,
                    belueftung_hyperventillation_a: isChecked_belueftung.current[5].current.checked,
                    belueftung_atemstillstand_a: isChecked_belueftung.current[6].current.checked,
                    belueftung_sonstiges_a: SonstigValue.current.value,
                    /////////////////////////////////////////////////////
                    puls_regelmaessig_a: isChecked_puls.current[0].current.checked,
                    puls_unregelmaessig_a: isChecked_puls.current[1].current.checked,
                    puls_gut_tastbar_a: isChecked_puls.current[2].current.checked,
                    puls_schlecht_tastbar_a: isChecked_puls.current[3].current.checked,
                    puls_nicht_tastbar_a: isChecked_puls.current[4].current.checked,
                    /////////////////////////////////////////////////////
                    haut_rosig_a: isChecked_haut.current[0].current.checked,
                    haut_blass_a: isChecked_haut.current[1].current.checked,
                    haut_blau_a: isChecked_haut.current[2].current.checked,
                    haut_rot_a: isChecked_haut.current[3].current.checked,
                    haut_warm_a: isChecked_haut.current[4].current.checked,
                    haut_kalt_a: isChecked_haut.current[5].current.checked
                }
            );

            console.log("anamnese : -------------------------------------------------------------------------------------------------------------------" + response.data);
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

    const nav_next = async () => {
        const save = async () => {
            await save_datas_anamnese();
        }

        await save();
        navigate('/messwerte');
    }

    const nav_previous = async () => {
        const save = async () => {
            await save_datas_anamnese();
        }

        await save();
        navigate('/patient');
    }

    const handleInputChange_SonstigValue = (event) => {
        let a = false;

        for (let i = 0; i < isChecked_belueftung.current.length; i += 1) {
            if (isChecked_belueftung.current[i].current.checked == true) {
                a = true;
                break;
            }
        }

        if (a == true || event.target.value !== "") {
            belueftung_l.current.style.color = "black"
        } else {
            belueftung_l.current.style.color = "red"
        }
    }

    function handleOnChange(event) {
        atemwege.current = event.target.value;
        atemwege_l.current.style.color = "black";
    }

    function handleOnChange_belueftng(e, type) {

        let a = false;

        for (let i = 0; i < isChecked_belueftung.current.length; i += 1) {
            if (isChecked_belueftung.current[i].current.checked == true) {
                a = true;
                break;
            }
        }

        if (a == true || SonstigValue.current.value !== "") {
            belueftung_l.current.style.color = "black"
        } else {
            belueftung_l.current.style.color = "red"
        }

        console.log(type);

    }

    function handleOnChange_puls(e, type) {
        let a = false;

        for (let i = 0; i < isChecked_puls.current.length; i += 1) {
            if (isChecked_puls.current[i].current.checked == true) {
                a = true;
                break;
            }
        }

        if (a == true) {
            puls_l.current.style.color = "black"
        } else {
            puls_l.current.style.color = "red"
        }

        console.log(type);
    }



    function handleOnChange_haut(e, type) {

        let a = false;

        for (let i = 0; i < isChecked_haut.current.length; i += 1) {
            if (isChecked_haut.current[i].current.checked == true) {
                a = true;
                break;
            }
        }

        if (a == true) {
            haut_l.current.style.color = "black"
        } else {
            haut_l.current.style.color = "red"
        }

        console.log(type);
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
        <div id="main" style={{ pointerEvents: "none" }} className="anamnese">
            <Sidebar currentPage="anamnese" save_a={save_datas_anamnese} datas={datasss} 
            del={delete_d} instanz_erstellen={instanz_erstellen}/>
            <Topbar currentPage="anamnese" datas={datasss} />

            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";

            }} className="anamnese_body">
                <span className="anamnese_body_title">
                    Anamnese
                </span>
                <div className="anamnese_body_components">
                    <div className="anamnese_body_components_line">
                        <span ref={atemwege_l} className="anamnese_body_components_line_label">
                            Atemwege: *
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    className="anamnese_body_components_line_right3_multiselect_radio"
                                    id="anamnese_atemwege_frei"
                                    type="radio"
                                    name="atemwege"
                                    value="frei"
                                    onClick={handleOnChange}
                                />
                                <label htmlFor="anamnese_atemwege_frei">Frei</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    className="anamnese_body_components_line_right3_multiselect_radio"
                                    id="anamnese_atemwege_verlegt"
                                    type="radio"
                                    name="atemwege"
                                    value="verlegt"
                                    onClick={handleOnChange}
                                />
                                <label htmlFor="anamnese_atemwege_verlegt">Verlegt</label>
                            </div>
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span ref={belueftung_l} className="anamnese_body_components_line_label">
                            Belüftung: *
                        </span>
                        <div className="anamnese_body_components_line_right2">
                            <div className="anamnese_body_components_line_right2_body">
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_unauffaellig"
                                        ref={isChecked_belueftung.current[0]}
                                        onChange={(e) => handleOnChange_belueftng(e, "Unauffaellig")}
                                    />
                                    <label htmlFor="anamnese_beluftung_unauffaellig">Unauffällig</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_zyanose"
                                        ref={isChecked_belueftung.current[1]}
                                        onChange={(e) => handleOnChange_belueftng(e, "Zyanose")}
                                    />
                                    <label htmlFor="anamnese_beluftung_zyanose">Zyanose</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_rasseln"
                                        ref={isChecked_belueftung.current[2]}
                                        onChange={(e) => handleOnChange_belueftng(e, "Rasseln")}
                                    />
                                    <label htmlFor="anamnese_beluftung_rasseln">Rasseln</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_schnappatmung"
                                        ref={isChecked_belueftung.current[3]}
                                        onChange={(e) => handleOnChange_belueftng(e, "Schnappatmung")}
                                    />
                                    <label htmlFor="anamnese_beluftung_schnappatmung">Schnappatmung</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_atemnot"
                                        ref={isChecked_belueftung.current[4]}
                                        onChange={(e) => handleOnChange_belueftng(e, "Atemnot")}
                                    />
                                    <label htmlFor="anamnese_beluftung_atemnot">Atemnot</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_hyperventillation"
                                        ref={isChecked_belueftung.current[5]}
                                        onChange={(e) => handleOnChange_belueftng(e, "Hyperventillation")}
                                    />
                                    <label htmlFor="anamnese_beluftung_hyperventillation">Hyperventillation</label>
                                </div>
                                <div className="anamnese_body_components_line_right2_body_multiselect">
                                    <input
                                        type="checkbox"
                                        id="anamnese_beluftung_atemstillstand"
                                        ref={isChecked_belueftung.current[6]}
                                        onChange={(e) => handleOnChange_belueftng(e, "Atemstillstand")}
                                    />
                                    <label htmlFor="anamnese_beluftung_atemstillstand">Atemstillstand</label>
                                </div>
                            </div>

                            <input type="text"
                                ref={SonstigValue}
                                className="anamnese_body_components_line_right2_txt"
                                placeholder="Sonstiges"
                                title="Sonstiges"
                                onChange={handleInputChange_SonstigValue}
                            />
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span ref={puls_l} className="anamnese_body_components_line_label">
                            Puls: *
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_regelmasessig"
                                    ref={isChecked_puls.current[0]}
                                    onChange={(e) => handleOnChange_puls(e, "Regelmaeßig")}
                                />
                                <label htmlFor="anamnese_puls_regelmasessig">Regelmäßig</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_unregelmaessig"
                                    ref={isChecked_puls.current[1]}
                                    onChange={(e) => handleOnChange_puls(e, "Unregelmaeßig")}
                                />
                                <label htmlFor="anamnese_puls_unregelmaessig">Unregelmäßig</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_gut_tastbar"
                                    ref={isChecked_puls.current[2]}
                                    onChange={(e) => handleOnChange_puls(e, "Gut tastbar")}
                                />
                                <label htmlFor="anamnese_puls_gut_tastbar">Gut tastbar</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_schlecht_tastbar"
                                    ref={isChecked_puls.current[3]}
                                    onChange={(e) => handleOnChange_puls(e, "Schlecht tastbar")}
                                />
                                <label htmlFor="anamnese_puls_schlecht_tastbar">Schlecht tastbar</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_puls_nicht_tastbar"
                                    ref={isChecked_puls.current[4]}
                                    onChange={(e) => handleOnChange_puls(e, "Nicht tastbar")}
                                />
                                <label htmlFor="anamnese_puls_nicht_tastbar">Nicht tastbar</label>
                            </div>

                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="anamnese_body_components_line">
                        <span ref={haut_l} className="anamnese_body_components_line_label">
                            Haut: *
                        </span>
                        <div className="anamnese_body_components_line_right3">
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_rosig"
                                    ref={isChecked_haut.current[0]}
                                    onChange={(e) => handleOnChange_haut(e, "Rosig")}
                                />
                                <label htmlFor="anamnese_haut_rosig">Rosig</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_blass"
                                    ref={isChecked_haut.current[1]}
                                    onChange={(e) => handleOnChange_haut(e, "Blass")}
                                />
                                <label htmlFor="anamnese_haut_blass">Blass</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_blau"
                                    ref={isChecked_haut.current[2]}
                                    onChange={(e) => handleOnChange_haut(e, "Blau")}
                                />
                                <label htmlFor="anamnese_haut_blau">Blau</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_rot"
                                    ref={isChecked_haut.current[3]}
                                    onChange={(e) => handleOnChange_haut(e, "Rot")}
                                />
                                <label htmlFor="anamnese_haut_rot">Rot</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_warm"
                                    ref={isChecked_haut.current[4]}
                                    onChange={(e) => handleOnChange_haut(e, "Warm")}
                                />
                                <label htmlFor="anamnese_haut_warm">Warm</label>
                            </div>

                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    type="checkbox"
                                    id="anamnese_haut_kalt"
                                    ref={isChecked_haut.current[5]}
                                    onChange={(e) => handleOnChange_haut(e, "Kalt")}
                                />
                                <label htmlFor="anamnese_haut_kalt">Kalt</label>
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