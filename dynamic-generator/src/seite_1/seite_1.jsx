import "../general.css"

import React from "react";
import Topbar from "../topbar/topbar";
import Dynamic_generator from "../dynamic_generator/dynamic_generator";

import {
    ArrowForwardIos
} from "@mui/icons-material";

import { useEffect, useRef } from "react";

export default function Seite_1() {

    const page_name = useRef("Massnahmen_Einsatzart");

    useEffect(() => {
        document.getElementById("page").style.minHeight = document.getElementById("next").offsetTop + 55 + "px";
        document.getElementById("page_body").style.minHeight = document.getElementById("next").offsetTop + 10 + "px";
        if (page_name.current === "Massnahmen_Einsatzart") {
            document.getElementById("EMSTYPE_label_3").style.color = "#FF0000";
            document.getElementById("EMSTYPE_label_4").style.color = "#FFFF00";
        }
    }, [])

    return (

        <div onClick={() => {
            //console.log(document.getElementById("BEWUSSTSEIN").value);

        }} id="page" className="page">
            <Topbar />
            <div id="page_body" className="page_body">
                <span className="page_body_title">
                    Einsatzdaten
                </span>
                <div className="page_body_components">

                    <Dynamic_generator page_name={page_name.current} />


                </div>

                <div className="page_body_buttons_special">
                    <button id="next" className="page_body_buttons_btn_next">Nächste<ArrowForwardIos /></button>
                </div>

            </div>
        </div>
    );
}