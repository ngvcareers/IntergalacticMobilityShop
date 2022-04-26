import React from 'react';
import { StyledVehicleButton } from './styledComponents/StyledDashboard';
export const VehicleViewButton = ({ handleClick, children }) => {
    return (
        <StyledVehicleButton onClick={handleClick}>
            {children}
        </StyledVehicleButton>
    );
};