import "./topbar.css"
import { Menu, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Topbar() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("topbar");
    })

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
    }

    return (
        <div className="topbar_mc">
            <Menu className="topbar_mc_left" onClick={open_side_bar} />

            <img className="topbar_mc_middle_logo" src="assets/red_cross.png" />

            <Logout onClick={() => nav()} className="topbar_mc_right" />

        </div>
    );
}