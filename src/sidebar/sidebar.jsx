import "./sidebar.css"
import {
    Save, Settings, MonitorHeart, Dataset, BusAlert, Blind, LocalHospital,
    Preview, Delete, AssistWalker, EventNote, Psychology, Book, Close
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";


export default function Sidebar({ currentPage }) {

    const navigate = useNavigate();

    const nav = (page) => {
        navigate(page);
    }

    const close_side_bar = () => {
        document.getElementById("sidebar_mc_id").style.width = "0px";
        document.getElementById("sidebar_mc_id").style.border = "none";
    }

    return (
        <div id="sidebar_mc_id" className="sidebar_mc">
            <div className="sidebar_mcc">
                <Close className="sidebar_mc_closebtn" onClick={close_side_bar} />
                <a style={currentPage === "einstellungen" ? { color: "blue" } : {}} onClick={() => nav("/einstellungen")}><Settings className="sidebar_mc_ico" />Einstellungen</a>
                <hr></hr>
                <a style={currentPage === "einsatzdaten" ? { color: "blue" } : {}} onClick={() => nav("/einsatzdaten")}><Dataset className="sidebar_mc_ico" />Einsatzdaten</a>
                <a style={currentPage === "beteiligte_einsatzkraefte" ? { color: "blue" } : {}} onClick={() => nav("/beteiligte_einsatzkraefte")}><BusAlert className="sidebar_mc_ico" />Beteiligte Einsatzkräfte</a>
                <a style={currentPage === "patient" ? { color: "blue" } : {}} onClick={() => nav("/patient")}><Blind className="sidebar_mc_ico" />Patienten</a>
                <a style={currentPage === "anamnese" ? { color: "blue" } : {}} onClick={() => nav("/anamnese")}><EventNote className="sidebar_mc_ico" />Anamnese</a>
                <a style={currentPage === "messwerte" ? { color: "blue" } : {}} onClick={() => nav("/messwerte")}><Book className="sidebar_mc_ico" />Messwerte</a>
                <a style={currentPage === "neurologie" ? { color: "blue" } : {}} onClick={() => nav("/neurologie")}><Psychology className="sidebar_mc_ico" />Neurologie</a>
                <a style={currentPage === "verletzungen" ? { color: "blue" } : {}} onClick={() => nav("/verletzungen")}><AssistWalker className="sidebar_mc_ico" />Verletzungen</a>
                <a style={currentPage === "monitoring" ? { color: "blue" } : {}} onClick={() => nav("/monitoring")}><MonitorHeart className="sidebar_mc_ico" />Monitoring</a>
                <a style={currentPage === "massnahmen_einsatzart" ? { color: "blue" } : {}} onClick={() => nav("/massnahmen_einsatzart")}><LocalHospital className="sidebar_mc_ico" />Maßnahmen & Einsatzart</a>
                <hr></hr>
                <a style={currentPage === "vorschau" ? { color: "blue" } : {}} onClick={() => nav("/vorschau")}><Preview className="sidebar_mc_ico" />Vorschau</a>
                <a onClick={() => { alert("save"); }} ><Save className="sidebar_mc_ico" />Speichern</a>
                <a onClick={() => { alert("delete"); }} ><Delete className="sidebar_mc_ico" />Löschen</a>

            </div>
        </div>
    );
}