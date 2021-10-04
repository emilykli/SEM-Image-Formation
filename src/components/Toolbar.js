import React from 'react';

import "../styles/components/Toolbar.css";

const Toolbar = props => (
    <header className = "toolbar">
        <nav className = "toolbar_navigation">
            <div></div>
            <div className = "toolbar_logo"><a href = "/">Electron Image Formation</a></div> {/* add link to main menu in <a href = ""></a> in here later*/}
            <div className = "toolbar_navigation_items">
                <ul>
                    <li><a href = "/">Main Menu</a></li>
                    <li><a href = "/">Labels</a></li>
                    <li><a href = "/">Electron Beam Manipulation</a></li>
                    <li><a href = "/">Stage Manipulation</a></li>
                    <li><a href = "/">Electron Beam Imaging</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;