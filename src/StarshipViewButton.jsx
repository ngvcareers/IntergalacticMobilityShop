import React from 'react';
import { StyledStarShipButton } from './styledComponents/StyledDashboard';
export const StarshipViewButton = ({ handleClick, children }) => {
    return (
        <StyledStarShipButton onClick={handleClick}>
            {children}
        </StyledStarShipButton>
    );
}