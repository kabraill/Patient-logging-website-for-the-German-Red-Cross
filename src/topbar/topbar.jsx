import "./topbar.css"
import { GridView } from "@mui/icons-material";

export default function Topbar(){

    const open_side_bar = () => {
        document.getElementById("sidebar_mc_id").style.width = "250px";
        document.getElementById("sidebar_mc_id").style.border = "2px solid red";
    }

    return (
        <div className="topbar_mc">
            <GridView className="topbar_mc_left" onClick={open_side_bar}/>
            
            <img className="topbar_mc_middle_logo" src="assets/red_cross.png"/>
            
            <span className="topbar_mc_right">M</span>
        </div>
    );
}