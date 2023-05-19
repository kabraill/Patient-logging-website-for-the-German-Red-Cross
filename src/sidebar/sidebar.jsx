import "./sidebar.css"
import {
    MonitorHeart, Dataset, BusAlert, Blind, LocalHospital,
    Preview, Cancel,  AssistWalker, EventNote, Psychology, Book, Close
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();
    
    const nav = (page) => {
        navigate(page);
    }

    const close_side_bar = () => {
        document.getElementById("sidebar_mc_id").style.width = "0px";
        document.getElementById("sidebar_mc_id").style.border = "none";
    }

    return (
        <div onClick={close_side_bar} id="sidebar_mc_id" className="sidebar_mc">
            <div onClick={close_side_bar} className="sidebar_mcc">
                <Close className="sidebar_mc_closebtn" onClick={close_side_bar}/>
                
                <a onClick={() => nav("/seite_1")}><Dataset className="sidebar_mc_ico" />Einsatzdaten</a>
                <a onClick={() => nav("/seite_2")}><BusAlert className="sidebar_mc_ico" />Beteiligte Einsatzkräfte</a>
                <a onClick={() => nav("/patient")}><Blind className="sidebar_mc_ico" />Patienten</a>
                <a onClick={() => nav("/anamnese")}><EventNote className="sidebar_mc_ico" />Anamnese</a>
                <a onClick={() => nav("/messwerte")}><Book className="sidebar_mc_ico" />Messwerte</a>
                <a onClick={() => nav("/neurologie")}><Psychology className="sidebar_mc_ico" />Neurologie</a>
                <a onClick={() => nav("/verletzungen")}><AssistWalker className="sidebar_mc_ico" />Verletzungen</a>
                <a onClick={() => nav("/monitoring")}><MonitorHeart className="sidebar_mc_ico" />Überwachung</a>
                <a onClick={() => nav("/massnahmen_einsatzart")}><LocalHospital className="sidebar_mc_ico" />Maßnahmen</a>
                <hr></hr>
                <a><Preview className="sidebar_mc_ico" />Vorschau</a>
                <a><Cancel className="sidebar_mc_ico" />Abbrechen</a>
            
            </div>
        </div>
    );
}