import "./navigation.css"

import Sidebar from "../sidebar/sidebar";
import Topbar from "../topbar/topbar";

import {
    MonitorHeart, Dataset,EmojiPeople, Blind, LocalHospital,
    HelpCenter, ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Navigation() {

    return (
        <div className="navigation_mc">
            <Sidebar />
            <Topbar />
            <div className="navigation_mc_page">
                <div className="navigation_mc_page_c">
                    <button className="navigation_mc_page_c_btn"><MonitorHeart className="navigation_mc_page_c_btn_ico" />
                        Überwachung
                    </button>
                    <button className="navigation_mc_page_c_btn"><Dataset className="navigation_mc_page_c_btn_ico" />
                        Einsatzdaten
                    </button>
                    <button className="navigation_mc_page_c_btn"><EmojiPeople className="navigation_mc_page_c_btn_ico" />
                        ABCD
                    </button>
                    <button className="navigation_mc_page_c_btn"><Blind className="navigation_mc_page_c_btn_ico" />
                        Verletzungen
                    </button>
                    <button className="navigation_mc_page_c_btn"><LocalHospital className="navigation_mc_page_c_btn_ico" />
                        Maßnahmen
                    </button>
                    <button className="navigation_mc_page_c_btn"><HelpCenter className="navigation_mc_page_c_btn_ico" />
                        Weitere Helfer
                    </button>
                </div>
                <div className="navigation_mc_page_c_horizonzal">
                    <button className="navigation_mc_page_c_horizonzal_btn_back"><ArrowBackIos/>Vorherige</button>
                    <button className="navigation_mc_page_c_horizonzal_btn_next">nächste<ArrowForwardIos/></button>
                </div>
            </div>
        </div>
    );

}