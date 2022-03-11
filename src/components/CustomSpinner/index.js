import React from "react";
import { Spinner } from "react-bootstrap";
import "./styles.css";
const CustomSpinner = ({overlay = true}) => {
    return (
        <div className={overlay ? "loading-bg" : "no-loading-bg"}>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}
export default CustomSpinner;