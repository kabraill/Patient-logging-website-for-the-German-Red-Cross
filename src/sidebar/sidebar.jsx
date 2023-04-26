import "./sidebar.css"
import {
    MonitorHeart, Dataset,EmojiPeople, Blind, LocalHospital,
    HelpCenter, Preview, Cancel , Logout
 } from "@mui/icons-material";

export default function Sidebar() {
    const close_side_bar = () => {
        document.getElementById("sidebar_mc_id").style.width = "0px";
    }

    return (
        <div id="sidebar_mc_id" className="sidebar_mc">
            <a className="sidebar_mc_closebtn" onClick={close_side_bar}>
            &times;
            </a>
            <a><MonitorHeart className="sidebar_mc_ico"/>Überwachung</a>
            <a><Dataset className="sidebar_mc_ico"/>Einsatzdaten</a>
            <a><EmojiPeople className="sidebar_mc_ico"/>ABCD</a>
            <a><Blind className="sidebar_mc_ico"/>Verletzungen</a>
            <a><LocalHospital className="sidebar_mc_ico"/>Maßnahmen</a>
            <a><HelpCenter className="sidebar_mc_ico"/>Weitere Helfer & Notizen</a>
            <hr></hr>
            <a><Preview className="sidebar_mc_ico"/>Vorschau</a>
            <a><Cancel className="sidebar_mc_ico"/>Abbrechen</a>
            <a><Logout className="sidebar_mc_ico"/>Ausloggen</a>
        </div>
    );
}