import React from "react";
import Footer from "../components/footer";
import Toolbar from "../components/Toolbar";

import "../styles/containers/layout.css";

const Layout = (props) => {
    console.log(props);
    return (
        <div className = "layout">
            <Toolbar />
            <main style = {{marginTop: '50px'}}>
            {
                props.children
            }
            <Footer />
            </main>
        </div>
    )
}

export default Layout;