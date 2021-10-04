import React from 'react';

import "../styles/components/Toolbar.css";
import DrawerToggleButton from './SideDrawer/DrawerToggleButton';

const Toolbar = props => (
    <header className = "toolbar">
        <nav className = "toolbar_navigation">
            <div>
                <DrawerToggleButton click = {props.drawerClickHandler}/>
            </div>
            <div className = "toolbar_logo"><a href = "/">Electron Image Formation</a></div> {/* add link to main menu in <a href = ""></a> in here later*/}
            <div className = "spacer"></div>
            <div className = "toolbar_navigation_items">
                <ul>
                    <li><a href = "/">?</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;