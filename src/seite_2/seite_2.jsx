import "./seite_2.css"

import React, { useState } from "react";





import Topbar from "../topbar/topbar";
import Sidebar from "../sidebar/sidebar";



import {
    ArrowBackIos, ArrowForwardIos
} from "@mui/icons-material";

export default function Seite_2() {
   


    return (
        <div className="s2">
            <Sidebar />
            <Topbar />
            <div className="s2_body">
                <span className="s2_body_title">
                    Seite 1
                </span>
                <div className="s2_body_components">
                    <div className="s2_body_components_line">
                        <span className="s2_body_components_line_label">
                            Eingesetzte Fahrzeuge: *
                        </span>
                        <div className="s2_body_components_line_right">
                            <div className="s2_body_components_line_right">
                               
                            </div>

                        </div>
                    </div>




                </div>

                <div className="s1_body_buttons">
                    <button className="s1_body_buttons_btn_back"><ArrowBackIos />Vorherige</button>
                    <button className="s1_body_buttons_btn_next">nächste<ArrowForwardIos /></button>
                </div>



            </div>
        </div>
    );
}