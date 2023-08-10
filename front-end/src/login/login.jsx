import "./login.css"

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import {
    Visibility, Login
} from "@mui/icons-material";

import axios from "axios";

export default function LLogin() {
    const navigate = useNavigate();
    const [shown, setShown] = useState(true);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            /*
            localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_token');
            localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'false');
            localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
            localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
            */

            const token = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_token');
            const isLoggedIn = localStorage.getItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn');

            if (isLoggedIn === 'true' && token) {
                const decodedToken = await decodeToken(token);

                console.log("login page isLoggedIn === 'true' && token")
                if (typeof decodedToken === 'undefined') {
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_token');
                    localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'false');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_draft_protocol');
                    localStorage.removeItem('deutsches_rottes_kreuz_herrenberg_instance');
                    document.getElementById("main").style.pointerEvents = "auto";
                } else {
                    navigate('/einstellungen');
                }
            } else {
                document.getElementById("main").style.pointerEvents = "auto";
            }
        };

        fetchData();
    }, []);


    const getTimeFromServer = async () => {
        try {
            const response = await axios.get("http://localhost:8800/user/time");
            const t = new Date(response.data)
            console.log(t + "    server time");

            return t;
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


    const nav = async () => {

        await axios.post("http://localhost:8800/user/login", {
            name: name,
            password: password
        }).then((response) => {

            localStorage.setItem('deutsches_rottes_kreuz_herrenberg_token', response.data);
            localStorage.setItem('deutsches_rottes_kreuz_herrenberg_isLoggedIn', 'true');
            navigate('/einstellungen');
        }).catch((error) => {
            alert('Error: '+ error.response.data);
        });

    };

    const contact = () => {
        alert("Schreiben Sie Ihre Fragen an die Folgende E-mail:\nn.rubehn@drk-herrenberg.de");
    }

    const handleChange_name = (e) => {
        setName(e.target.value);
    }

    const handleChange_password = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div id="main" style={{pointerEvents: "none"}} className="login">
            <div className="login_body">
                <div className="login_body_top">
                    <img className="login_body_top_ico" src="assets/red_cross.png"></img>
                    <span className="login_body_top_txt">DRK HvO Protokollierer</span>
                </div>

                <div className="horizontal-line"></div>

                <div className="login_body_middle">
                    <span className="login_body_middle_txt">
                        Name: *
                    </span>
                    <input className="login_body_middle_txtbx" placeholder="Ihr Name"
                        onChange={handleChange_name}
                        value={name} />

                    <span className="login_body_middle_txt">
                        Kennwort: *
                    </span>
                    <div className="login_body_middle_c">
                        <input type={shown ? "password" : "text"} className="login_body_middle_c_txtbx" placeholder="Ihr Kennwort"
                            onChange={handleChange_password}
                            value={password} />
                        <Visibility onClick={() => setShown(!shown)} />
                    </div>

                </div>

                <div className="horizontal-line"></div>

                <div className="login_body_bottom">
                    <button className="login_body_bottom_button" onClick={nav} ><Login className="login_body_bottom_ico" /> Anmelden </button>
                    <a href="#" className="login_body_bottom_link">Kennwort Vergessen?</a>
                    <a href="#" className="login_body_bottom_link" onClick={contact}>Kontakt</a>
                </div>
            </div>
        </div>
    );
}