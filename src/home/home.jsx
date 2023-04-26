import "./home.css"

import Sidebar from "../sidebar/sidebar";
import Topbar from "../topbar/topbar";

import {
    Add, DesignServices, Archive, BarChart
} from "@mui/icons-material";

export default function Home() {

    return (
        <div className="home_mc">
            <Sidebar />
            <Topbar />
            <div className="home_mc_page">
                <div className="home_mc_page_c">
                    <button className="home_mc_page_c_btn"><Add className="home_mc_page_c_btn_ico" />
                        Neues Protokoll
                    </button>
                    <button className="home_mc_page_c_btn"><DesignServices className="home_mc_page_c_btn_ico" />
                        Entwürfe
                    </button>
                    <button className="home_mc_page_c_btn"><Archive className="home_mc_page_c_btn_ico" />
                        Archiv
                    </button>
                    <button className="home_mc_page_c_btn"><BarChart className="home_mc_page_c_btn_ico" />
                        Statistiken
                    </button>
                </div>
            </div>
        </div>
    );

}