import "./login.css"
import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import {
    Visibility, Login
} from "@mui/icons-material";

export default function LLogin() {
    const navigate = useNavigate();
    const [shown, setShown] = useState(true);

    const nav = () => {
        //window.location.replace('https://codefrontend.com');
        navigate('/seite_1');
    }

    const contact = () => {
        alert("Schreiben Sie Ihre Fragen an die Folgende E-mail:\nn.rubehn@drk-herrenberg.de");
    }



    return (
        <div className="login">
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
                    <input className="login_body_middle_txtbx" placeholder="Ihr Name" />

                    <span className="login_body_middle_txt">
                        Kennwort: *
                    </span>
                    <div className="login_body_middle_c">
                        <input type={shown? "password" : "text"} className="login_body_middle_c_txtbx" placeholder="Ihr Kennwort" />
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