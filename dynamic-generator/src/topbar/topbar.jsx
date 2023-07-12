import "./topbar.css"
import { Menu, Logout } from "@mui/icons-material";


export default function Topbar() {
    

    return (
        <div className="topbar_mc">
            <Menu className="topbar_mc_left" />

            <img className="topbar_mc_middle_logo" src="assets/red_cross.png" />

            <Logout className="topbar_mc_right" />

        </div>
    );
}