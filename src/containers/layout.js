import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/containers/layout.css";

const Layout = (props) => {
    console.log(props);
    return (
        <div className = "layout">
            <Header />
            {
                props.children
            }
            <Footer />
        </div>
    )
}

export default Layout;