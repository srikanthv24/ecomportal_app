import React from "react";
import { Spinner } from "react-bootstrap";
import "./styles.css";
const CustomSpinner = () => {
    return (
        <div className="loading-bg">
            <Spinner animation="border" variant="primary" />
        </div>
    )
}
export default CustomSpinner;