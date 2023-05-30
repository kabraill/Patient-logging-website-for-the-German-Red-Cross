import "./einstellungen.css"

import Sidebar from "../sidebar/sidebar";
import Topbar from "../topbar/topbar";

export default function Einstellungen() {

    return (
        <div className="einstellungen">
            <Sidebar currentPage="einstellungen" />
            <Topbar />
            <div onClick={() => {
                document.getElementById("sidebar_mc_id").style.width = "0px";
                document.getElementById("sidebar_mc_id").style.border = "none";
            }} className="einstellungen_body">
                <span className="einstellungen_body_title">
                    Einstellungen
                </span>


            </div>
        </div>
    );
}