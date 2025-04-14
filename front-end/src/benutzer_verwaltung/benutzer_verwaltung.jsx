import Sidebar from "../sidebar/sidebar";
import Topbar from "../topbar/topbar";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";


export default function Benutzer_verwaltung() {

    const navigate = useNavigate();

    const process_type = useRef("");

    const [users, setUsers] = useState([]);
    const index = useRef("");


    const values = useRef([useRef(), useRef(), useRef(), useRef()]);
    const laden = useRef([useRef()]);
    const bearbeiten = useRef([useRef(), useRef(), useRef(), useRef()]);

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
            if (!values.current[0].current.value.match(/^([a-zA-Z]+\w+-)*[a-zA-Z]+\w+$/)) {
                alert("Der Name ist ungültig!!");
                return;
            }

            if (values.current[1].current.value.includes(" ")) {
                alert("Das Kennwort darf kein Leerzeichen enthallten!!");
                return;
            }

            if (!values.current[2].current.value.includes("@")) {
                alert("Die E-mail muss @ Symbol enthalten!!");
                return;
            }

            if (values.current[2].current.value.includes(" ")) {
                alert("Die E-mail darf kein Leerzeichen enthalten!");
                return;
            }

            const userResponse = window.confirm("Sind Sie sicher, dass Sie einen neuen Benutzer erstellen möchten?");
            if (!userResponse) {
                return;
            }

            try {
                const response = await axios.post("http://localhost:8800/user/register", {
                    name: values.current[0].current.value.trim(),
                    password: values.current[1].current.value.trim(),
                    email: values.current[2].current.value.trim(),
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

            if (laden.current[0].current.value.trim() === "") {

                alert("Schreiben Sie einen Namen oder Eine E-mail zu suchen!!")
                return;
            }

            obj.text = laden.current[0].current.value.trim()
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
        bearbeiten.current[1].current.value = "";
        bearbeiten.current[2].current.value = users[index.current].email;
        bearbeiten.current[3].current.value = users[index.current].permission[0];
    }

    async function speichern_main() {
        async function speichern() {

            if (!bearbeiten.current[0].current.value.match(/^([a-zA-Z]+\w+-)*[a-zA-Z]+\w+$/)) {
                alert("Der neue Benutzername hat einen falschen Muster!");
                return;
            }

            if (bearbeiten.current[1].current.value.includes(" ")) {
                alert("Das Kennwort darf kein Leerzeichen enthalten!");
                return;
            }

            if (!bearbeiten.current[2].current.value.includes("@")) {
                alert("Die E-mail muss @ enthalten!");
                return;
            }

            if (bearbeiten.current[2].current.value.includes(" ")) {
                alert("Die E-mail darf kein Leerzeichen enthalten!");
                return;
            }

            const userResponse = window.confirm("Sind Sie sicher, dass Sie speichern möchten?");
            if (!userResponse) {
                return;
            }
            if (index.current !== "") {
                try {
                    let obj = {
                        old_name: users[index.current].name
                    }

                    obj.new_name = bearbeiten.current[0].current.value.trim();

                    obj.password = bearbeiten.current[1].current.value.trim();

                    obj.email = bearbeiten.current[2].current.value;

                    obj.permission = bearbeiten.current[3].current.value;

                    const response = await axios.put("http://localhost:8800/user/save", obj)

                    if (typeof (response.data) === "string") {

                        alert(response.data)
                    } else {
                        let user_list = users.slice();

                        user_list[index.current].name = bearbeiten.current[0].current.value.trim();

                        user_list[index.current].password = bearbeiten.current[1].current.value.trim();

                        user_list[index.current].email = bearbeiten.current[2].current.value.trim();

                        user_list[index.current].permission[0] = bearbeiten.current[3].current.value.trim();

                        console.log("perm : " + user_list[index.current].permission);

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

            if (!bearbeiten.current[0].current.value.match(/^([a-zA-Z]+\w+-)*[a-zA-Z]+\w+$/)) {
                alert("Der Benutzername hat einen falschen Muster!");
                return;
            }


            const userResponse = window.confirm("Sind Sie sicher, dass Sie löschen möchten?");

            if (!userResponse) {
                return;
            }

            if (index.current !== "") {
                try {
                    if (user_u.name === bearbeiten.current[0].current.value.trim()) {

                        alert("Sie können Ihr eigenes Konto nicht löschen")
                        return;
                    }
                    const response = await axios.post("http://localhost:8800/user/delete", {
                        name: bearbeiten.current[0].current.value.trim()
                    })

                    console.log(typeof (response.data))
                    if (typeof (response.data) === "string") {

                        alert(response.data)
                    } else {

                        let user_list = users.slice();

                        user_list.splice(index.current, 1)

                        setUsers(user_list);
                        bearbeiten.current[0].current.value = "";
                        bearbeiten.current[1].current.value = "";
                        bearbeiten.current[2].current.value = "";
                        bearbeiten.current[3].current.value = "Normaler-Benutzer";
                        if (users.length - 1 == 0) {
                            document.getElementById("benutzer_bearbeiten").style.pointerEvents = "none";
                        }

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
                                    <input ref={laden.current[0]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="Name oder E-mail" />
                                </div>
                            </div>

                            <button onClick={mein_konto_laden} className="s1_body_buttons_btn_custom">Mein Konto Laden</button>
                            <button onClick={laden_main} className="s1_body_buttons_btn_next">Laden</button>
                            <button onClick={alle_laden_main} className="s1_body_buttons_btn_next">Alle Laden</button>
                        </div>
                    </div>}

                    <div className="horizontal-line"></div>
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

                                    <label htmlFor="choices_name">Name</label>
                                    <input id="choices_name" ref={bearbeiten.current[0]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 4 buchstaben" />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">

                                    <label htmlFor="choices_password">Kennwort</label>
                                    <input type="password" id="choices_password" ref={bearbeiten.current[1]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 6 buchstaben"
                                    />
                                </div>

                                <div className="verletzungen_body_components_line_right3_multiselect">

                                    <label htmlFor="choices_email">E-mail</label>
                                    <input id="choices_email" ref={bearbeiten.current[2]}
                                        style={{ fontSize: "15px" }}
                                        placeholder="zumindest 5 buchstaben"
                                    />
                                </div>

                                <div style={{ width: "90%", flexWrap: "wrap" }} className="verletzungen_body_components_line_right3_multiselect">


                                    <label>Berechtigung</label>
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