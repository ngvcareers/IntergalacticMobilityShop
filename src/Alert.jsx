import React from "react";
import './styledComponents/StyledDashboard/Alert.css';

export const Alert = ({ handleClose, children, close = true }) => {
    return (
        <div className="alert-window">
            <div className="window">
                {close && <span className="close-icon" onClick={handleClose}>x</span>}
                {children}
            </div>
        </div>
    );
};