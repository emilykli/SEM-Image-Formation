import React from "react";

import "../styles/components/Backdrop.css"

const Backdrop = props => (
    <div className = "backdrop" onClick = {props.click}></div>
);

export default Backdrop;