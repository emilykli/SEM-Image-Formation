import React from "react";

import DrawerToggleButton from "./DrawerToggleButton";

import "../../styles/components/sideDrawer/SideDrawer.css";

const SideDrawer = props => {

    let drawerClasses = "side_drawer";
    if (props.show)
    {
        drawerClasses = "side_drawer open";
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <li><a href="/">Main Menu</a></li>
                <li><a href="/">Labels</a></li>
                <li><a href="/">Electron Beam Manipulation</a></li>
                <li><a href="/">Stage Manipulation</a></li>
                <li><a href="/">Electron Beam Imaging</a></li>
            </ul>
        </nav>
    );

};

export default SideDrawer;