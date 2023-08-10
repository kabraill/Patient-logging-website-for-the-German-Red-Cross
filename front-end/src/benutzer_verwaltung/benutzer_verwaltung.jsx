import Sidebar from "../sidebar/sidebar";
import Topbar from "../topbar/topbar";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";


export default function Benutzer_verwaltung() {

    const navigate = useNavigate();

    const { reload, setReload } = useState(0)

    const process_type = useRef("");


    const [users, setUsers] = useState([]);
    const index = useRef("");


    const values = useRef([useRef(), useRef(), useRef(), useRef()]);
    const laden = useRef([useRef(), useRef(), useRef(), useRef()]);
    const bearbeiten = useRef([useRef(), useRef(), useRef(), useRef()]);
    const choices = useRef([useRef(), useRef(), useRef(), useRef()]);

    const [user_u, setUser_u] = useState();
    const pub_token = useRef();

    const [erstellen_isVisible, setErstellen_isVisible] = useState(false);
    const [laden_isVisible, setLaden_isVisible] = useState(false);

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

    const erstellen_main = async () => {
        const erstellen = async () => {
            const userResponse = window.confirm("Sind Sie sicher, dass Sie einen neuen Benutzer erstellen möchten?");
            if (!userResponse) {
                return;
            }

            try {
                const response = await axios.post("http://localhost:8800/user/register", {
                    name: values.current[0].current.value,
                    password: values.current[1].current.value,
                    email: values.current[2].current.value,
                    permission: [values.current[3].current.value],
                    statistics_permission: []
                })

                if (typeof (response.data) === "string") {
                    alert(response.data)
                } else {
                    alert("Ein Neuer Benutzer wurde erstellt")
                }


            } catch (error) {
                if (error.response && error.response.data) {
                    // If there is a response from the server with error details
                    alert('Error: ' + error.response.data.message);
                } else {
                    // If there is no specific error message in the response
                    alert('An error occurred during registration.');
                }
            }
        }

        await erstellen();

    }

    const savee = () => {

    };

    function handleOnChange_process(event, type) {


        if (type === "a") {
            setErstellen_isVisible(true)
            setLaden_isVisible(false)

        }

        if (type === "b") {
            setLaden_isVisible(true)
            setErstellen_isVisible(false)
        }

    }

    function handleOnChange_process_bearbeiten(event, type) {
        process_type.current = event.target.value;

    }

    async function laden_main() {
        async function ladenn() {

            let permission = ["Normaler-Benutzer"]
            if (user_u.permission[0] === "Benutzer-Administrator") {

            } else if (user_u.permission[0] === "Organisation-Administrator") {
                permission.push("Benutzer-Administrator")

            } else if (user_u.permission[0] === "Global-Admin") {
                permission.push("Benutzer-Administrator")
                permission.push("Organisation-Administrator")

            }

            let obj = {}

            if (process_type.current === "benutzer_laden_Name") {
                obj.name = laden.current[0].current.value
            } else if (process_type.current === "benutzer_laden_kennwort") {
                obj.password = laden.current[1].current.value
            } else if (process_type.current === "benutzer_laden_email") {
                obj.email = laden.current[2].current.value
            } else if (process_type.current === "benutzer_laden_berechtigung") {
                obj.permission = laden.current[3].current.value
            } else {
                alert("Wählen Sie bitte ein Suchkriterium aus")
                return;
            }


            try {
                const response = await axios.post("http://localhost:8800/user/laden", obj,
                    {
                        headers: {
                            Authorization: permission,
                        },
                    })

                if (typeof (response.data) === "string") {

                    //setOptions([]);
                    setUsers([])
                    document.getElementById("benutzer_bearbeiten").style.pointerEvents = "none"
                    alert(response.data)
                } else {
                    /*let opt = []
                    for (let elem of response.data) {
                        opt.push(elem.name)
                    }
                    setOptions(opt);*/
                    setUsers(response.data)
                    document.getElementById("benutzer_bearbeiten").style.pointerEvents = "auto"
                }


            } catch (error) {
                if (error.response && error.response.data) {
                    // If there is a response from the server with error details
                    alert('Error: ' + error.response.data.message);
                } else {
                    // If there is no specific error message in the response
                    alert('An error occurred during registration.');
                }
            }
        }

        await ladenn();

    }

    async function mein_konto_laden() {

        setUsers([user_u]);
        document.getElementById("benutzer_bearbeiten").style.pointerEvents = "auto";

    }

    async function alle_laden_main() {
        async function alle_laden() {
            let permission = [user_u.name, "Normaler-Benutzer"]

            if (user_u.permission[0] === "Benutzer-Administrator") {

            } else if (user_u.permission[0] === "Organisation-Administrator") {
                permission.push("Benutzer-Administrator")

            } else if (user_u.permission[0] === "Global-Admin") {
                permission.push("Benutzer-Administrator")
                permission.push("Organisation-Administrator")

            }

            try {
                const response = await axios.post("http://localhost:8800/user/alle_laden", { perm: permission })

                if (typeof (response.data) === "string") {

                    //setOptions([]);
                    setUsers([])
                    document.getElementById("benutzer_bearbeiten").style.pointerEvents = "none"
                    alert(response.data)
                } else {
                    let opt = []
                    for (let elem of response.data) {
                        opt.push(elem.name)
                    }
                    //setOptions(opt);
                    setUsers(response.data);
                    document.getElementById("benutzer_bearbeiten").style.pointerEvents = "auto"
                }

            } catch (error) {
                if (error.response && error.response.data) {
                    // If there is a response from the server with error details
                    alert('Error: ' + error.response.data.message);
                } else {
                    // If there is no specific error message in the response
                    alert('An error occurred during registration.');
                }
            }
        }

        await alle_laden();
    }

    function zeigen() {

        for (let i = 0; i < users.length; i += 1) {
            if (users[i].name === document.getElementById("benutzer_bearbeiten_users").value) {
                index.current = i;
                break;
            }
        }


        bearbeiten.current[0].current.value = users[index.current].name;
        bearbeiten.current[2].current.value = users[index.current].email;
        bearbeiten.current[3].current.value = users[index.current].permission[0];

    }

    async function speichern_main() {
        async function speichern() {
            const userResponse = window.confirm("Sind Sie sicher, dass Sie speichern möchten?");
            if (!userResponse) {
                return;
            }
            if (index.current !== "") {
                try {
                    let obj = {
                        old_name: users[index.current].name
                    }

                    if (choices.current[0].current.checked == true) {
                        obj.new_name = bearbeiten.current[0].current.value;
                    }

                    if (choices.current[1].current.checked == true) {
                        obj.password = bearbeiten.current[1].current.value;
                    }

                    if (choices.current[2].current.checked == true) {
                        obj.email = bearbeiten.current[2].current.value;
                    }

                    if (choices.current[3].current.checked == true) {
                        obj.permission = bearbeiten.current[3].current.value;
                    }


                    const response = await axios.put("http://localhost:8800/user/save", obj)

                    if (typeof (response.data) === "string") {

                        alert(response.data)
                    } else {
                        let user_list = users.slice();

                        if (choices.current[0].current.checked == true) {
                            user_list[index.current].name = bearbeiten.current[0].current.value;
                        }

                        if (choices.current[1].current.checked == true) {
                            user_list[index.current].password = bearbeiten.current[1].current.value;
                        }

                        if (choices.current[2].current.checked == true) {
                            user_list[index.current].email = bearbeiten.current[2].current.value;
                        }

                        if (choices.current[3].current.checked == true) {
                            user_list[index.current].permission = bearbeiten.current[3].current.value;
                        }



                        setUsers(user_list);

                        alert("Die neuen Informationen wurden gespeichert");
                    }
                } catch (error) {
                    if (error.response && error.response.data) {
                        // If there is a response from the server with error details
                        alert('Error: ' + error.response.data.message);
                    } else {
                        // If there is no specific error message in the response
                        alert('An error occurred during registration.');
                    }
                }
            } else {
                alert("Sie müssen das Button Zeigen drücken");
            }
        }

        await speichern();
    }

    async function del_user() {
        async function del_user_main() {

            const userResponse = window.confirm("Sind Sie sicher, dass Sie löschen möchten?");
            if (!userResponse) {
                return;
            }
            if (index.current !== "") {
                try {
                    if (user_u.name === bearbeiten.current[0].current.value) {

                        alert("Sie können Ihr eigenes Konto nicht löschen")
                        return;
                    }
                    const response = await axios.post("http://localhost:8800/user/delete", {
                        name: bearbeiten.current[0].current.value
                    })

                    console.log(typeof (response.data))
                    if (typeof (response.data) === "string") {

                        alert(response.data)
                    } else {

                        alert("Das Konto wurde erfolgreich gelöscht");
                    }

                } catch (error) {
                    if (error.response && error.response.data) {
                        // If there is a response from the server with error details
                        alert('Error: ' + error.response.data.message);
                    } else {
                        // If there is no specific error message in the response
                        alert('An error occurred during registration.');
                    }
                }
            } else {
                alert("Sie müssen das Button Zeigen drücken");
            }
        }

        await del_user_main();

    }

    return (
        <div id="main" style={{ pointerEvents: "none", minHeight: "970px" }} className="einstellungen">
            <Sidebar currentPage="benutzer_verwaltung" save_a={savee} />
            <Topbar currentPage="benutzer_verwaltung" />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";

            }} style={{ minHeight: "925px" }} className="einstellungen_body">
                <span className="einstellungen_body_title">
                    Benutzerverwaltung
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
                                <label htmlFor="Neues_Draft_Protocol_erstellen">Neuer benutzer erstellen</label>
                            </div>
                            <div className="anamnese_body_components_line_right3_multiselect">
                                <input
                                    className="anamnese_body_components_line_right3_multiselect_radio"
                                    id="Draft_Protocol_laden"
                                    type="radio"
                                    name="process_type"
                                    value="Draft_Protocol_laden"
                                    onClick={(e) => handleOnChange_process(e, "b")} />
                                <label htmlFor="Draft_Protocol_laden">Benutzer laden & bearbeiten</label>
                            </div>


                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    {erstellen_isVisible && <div className="einstellungen_body_components_line">
                        <span className="einstellungen_body_components_line_label">
                            Neuer benutzer erstellen:
                        </span>

                        <div className="einstellungen_body_components_line_right">
                            <div className="einstellungen_body_components_line_right">
                                <div className="verletzungen_body_components_line_right3_multiselect">

                                    <label>Name</label>
                                    <input ref={values.current[0]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 4 buchstaben" />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">

                                    <label>Kennwort</label>
                                    <input ref={values.current[1]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 6 buchstaben"
                                    />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">

                                    <label >E-mail</label>
                                    <input ref={values.current[2]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 5 buchstaben"
                                    />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">

                                    <label>Berechtigung</label>
                                    <select ref={values.current[3]}
                                        id="select_custom" className="patient_body_components_line_right_dropdown">
                                        <option id="option_custom" className="patient_body_components_line_right_choice" value="Normaler-Benutzer">Normaler Benutzer</option>
                                        {(user_u !== undefined && (user_u.permission[0] === "Benutzer-Administrator"
                                            || user_u.permission[0] === "Organisation-Administrator"
                                            || user_u.permission[0] === "Global-Admin"))
                                            && < option id="option_custom" className="patient_body_components_line_right_choice" value="Benutzer-Administrator">Benutzersadministrator</option>}
                                        {(user_u !== undefined && (user_u.permission[0] === "Organisation-Administrator"
                                            || user_u.permission[0] === "Global-Admin"))
                                            && <option id="option_custom" className="patient_body_components_line_right_choice" value="Organisation-Administrator">Organisationsadministrator</option>}
                                        {(user_u !== undefined && (user_u.permission[0] === "Global-Admin"))
                                            && <option id="option_custom" className="patient_body_components_line_right_choice" value="Global-Admin">Global Admin</option>}
                                    </select>
                                </div>
                            </div>

                            <button onClick={erstellen_main} className="s1_body_buttons_btn_next">Erstellen</button>
                        </div>
                    </div>}

                    {laden_isVisible && <div className="einstellungen_body_components_line">
                        <span className="einstellungen_body_components_line_label">
                            Benutzer laden:
                        </span>

                        <div className="einstellungen_body_components_line_right">
                            <div className="einstellungen_body_components_line_right">
                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        className="anamnese_body_components_line_right3_multiselect_radio"
                                        id="benutzer_laden_Name"
                                        type="radio"
                                        name="benutzer_laden"
                                        value="benutzer_laden_Name"
                                        onClick={(e) => handleOnChange_process_bearbeiten(e, "a")} />
                                    <label htmlFor="benutzer_laden_Name">Name</label>
                                    <input ref={laden.current[0]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 4 buchstaben" />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        className="anamnese_body_components_line_right3_multiselect_radio"
                                        id="benutzer_laden_kennwort"
                                        type="radio"
                                        name="benutzer_laden"
                                        value="benutzer_laden_kennwort"
                                        onClick={(e) => handleOnChange_process_bearbeiten(e, "a")} />
                                    <label htmlFor="benutzer_laden_kennwort">Kennwort</label>
                                    <input ref={laden.current[1]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 6 buchstaben"
                                    />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        className="anamnese_body_components_line_right3_multiselect_radio"
                                        id="benutzer_laden_email"
                                        type="radio"
                                        name="benutzer_laden"
                                        value="benutzer_laden_email"
                                        onClick={(e) => handleOnChange_process_bearbeiten(e, "a")} />
                                    <label htmlFor="benutzer_laden_email">E-mail</label>
                                    <input ref={laden.current[2]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 5 buchstaben"
                                    />
                                </div>

                                <div style={{ width: "90%", flexWrap: "wrap" }} className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        className="anamnese_body_components_line_right3_multiselect_radio"
                                        id="benutzer_laden_berechtigung"
                                        type="radio"
                                        name="benutzer_laden"
                                        value="benutzer_laden_berechtigung"
                                        onClick={(e) => handleOnChange_process_bearbeiten(e, "a")} />
                                    <label htmlFor="benutzer_laden_berechtigung">Berechtigung</label>
                                    <select ref={laden.current[3]}
                                        id="select_custom" className="patient_body_components_line_right_dropdown">
                                        <option id="option_custom" className="patient_body_components_line_right_choice" value="Normaler-Benutzer">Normaler Benutzer</option>
                                        {(user_u !== undefined && (user_u.permission[0] === "Organisation-Administrator"
                                            || user_u.permission[0] === "Global-Admin"))
                                            && < option id="option_custom" className="patient_body_components_line_right_choice" value="Benutzer-Administrator">Benutzersadministrator</option>}
                                        {(user_u !== undefined && (user_u.permission[0] === "Global-Admin"))
                                            && <option id="option_custom" className="patient_body_components_line_right_choice" value="Organisation-Administrator">Organisationsadministrator</option>}

                                    </select>
                                </div>
                            </div>

                            <button onClick={mein_konto_laden} className="s1_body_buttons_btn_custom">Mein Konto Laden</button>
                            <button onClick={laden_main} className="s1_body_buttons_btn_next">Laden</button>
                            <button onClick={alle_laden_main} className="s1_body_buttons_btn_next">Alle Laden</button>
                        </div>
                    </div>}

                    {laden_isVisible && <div id="benutzer_bearbeiten" style={{ pointerEvents: "none" }} className="einstellungen_body_components_line">
                        <span className="einstellungen_body_components_line_label">
                            Benutzer Bearbeiten:
                        </span>

                        <div className="einstellungen_body_components_line_right">
                            <select style={{ maxWidth: "400px" }}
                                id="benutzer_bearbeiten_users" className="patient_body_components_line_right_dropdown">

                                {users.map((usr) => (
                                    <option className="patient_body_components_line_right_choice" key={usr.name} value={usr.name}>
                                        {usr.name}
                                    </option>
                                ))}
                            </select>

                            <div className="einstellungen_body_components_line_right">
                                <button onClick={zeigen} className="s1_body_buttons_btn_next">Zeigen</button>
                            </div>

                            <div className="einstellungen_body_components_line_right">
                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        ref={choices.current[0]}
                                        id="choices_name"
                                    />
                                    <label htmlFor="choices_name">Name</label>
                                    <input ref={bearbeiten.current[0]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 4 buchstaben" />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        ref={choices.current[1]}
                                        id="choices_password"

                                    />
                                    <label htmlFor="choices_password">Kennwort</label>
                                    <input ref={bearbeiten.current[1]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 6 buchstaben"
                                    />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">
                                    <input
                                        type="checkbox"
                                        ref={choices.current[2]}
                                        id="choices_email"
                                    />
                                    <label htmlFor="choices_email">E-mail</label>
                                    <input ref={bearbeiten.current[2]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 5 buchstaben"
                                    />
                                </div>

                                <div style={{ width: "90%", flexWrap: "wrap" }} className="verletzungen_body_components_line_right3_multiselect">

                                    <input
                                        type="checkbox"
                                        ref={choices.current[3]}
                                        id="choices_permission"
                                    />
                                    <label htmlFor="choices_permission">Berechtigung</label>
                                    <select ref={bearbeiten.current[3]}
                                        id="select_custom" className="patient_body_components_line_right_dropdown">
                                        <option id="option_custom" className="patient_body_components_line_right_choice" value="Normaler-Benutzer">Normaler Benutzer</option>
                                        {(user_u !== undefined && (user_u.permission[0] === "Benutzer-Administrator"
                                            || user_u.permission[0] === "Organisation-Administrator"
                                            || user_u.permission[0] === "Global-Admin"))
                                            && < option id="option_custom" className="patient_body_components_line_right_choice" value="Benutzer-Administrator">Benutzersadministrator</option>}
                                        {(user_u !== undefined && (user_u.permission[0] === "Organisation-Administrator"
                                            || user_u.permission[0] === "Global-Admin"))
                                            && <option id="option_custom" className="patient_body_components_line_right_choice" value="Organisation-Administrator">Organisationsadministrator</option>}
                                        {(user_u !== undefined && (user_u.permission[0] === "Global-Admin"))
                                            && <option id="option_custom" className="patient_body_components_line_right_choice" value="Global-Admin">Global Admin</option>}
                                    </select>
                                </div>
                            </div>

                            <button onClick={speichern_main} className="s1_body_buttons_btn_next">Speichern</button>
                            <button onClick={del_user} className="s1_body_buttons_btn_next">Löschen</button>
                        </div>
                    </div>}
                </div>

            </div>
        </div >
    )
}