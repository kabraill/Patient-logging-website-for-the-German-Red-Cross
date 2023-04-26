import "./login.css"
import { useState } from "react";


import {
    Visibility, Login
} from "@mui/icons-material";

export default function LLogin() {
    const [shown, setShown] = useState(false);
    const navigate = () => {
        //window.location.replace('https://codefrontend.com');
    }

    const contact = () => {
        alert("Schreiben Sie Ihre Fragen an die Folgende E-mail:\nn.rubehn@drk-herrenberg.de");
    }



    return (
        <div className="login_mc">
            <div className="login_mc_c">
                <div className="login_mc_c_logo">
                    <img className="login_mc_c_logo_ico" src="assets/red_cross.jpg"></img>
                    <span className="login_mc_c_logo_txt1">DRK HvO Protokollierer</span>
                </div>

                <div className="login_mc_c_body">
                    <div className="login_mc_c_body_name">
                        <span className="login_mc_c_body_name_txt">Name</span>
                        <br></br>
                        <input className="login_mc_c_body_name_txtbx" placeholder="Ihr Name"></input>
                    </div>
                    <div className="login_mc_c_body_password">

                        <span className="login_mc_c_body_password_txt">Kennwort</span>
                        <br></br>
                        <div className="login_mc_c_body_password_c">
                            <input type={shown ? "text" : "password"} className="login_mc_c_body_password_txtbx" placeholder="Ihr Kennwort"></input>
                            <Visibility onClick={() => setShown(!shown)} className="login_mc_c_body_password_txt_ico"></Visibility>
                        </div>
                    </div>

                    <button className="login_mc_c_body_login_button" onClick={navigate}><Login className="login_mc_c_body_login_ico" /> Anmelden</button>
                    <a href="javascript:void(0)" className="login_mc_c_body_link">Kennwort Vergessen?</a>
                    <a href="javascript:void(0)" className="login_mc_c_body_link" onClick={contact}>Kontakt</a>

                </div>
            </div>

        </div>
    );
}