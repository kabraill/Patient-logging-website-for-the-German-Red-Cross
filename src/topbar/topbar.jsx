import "./topbar.css"
import { GridView } from "@mui/icons-material";

export default function Topbar(){

    const open_side_bar = () => {
        document.getElementById("sidebar_mc_id").style.width = "250px";
    }

    return (
        <div className="topbar_mc">
            <GridView className="topbar_mc_left" onClick={open_side_bar}/>
            
            <input className="topbar_mc_middle_txtbx" placeholder="Type anything to search"></input>
            
            <span className="topbar_mc_right">M</span>
        </div>
    );
}