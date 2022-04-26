import React from 'react';
import { additionalInfo, conclusionText, Introduction, StyledAppTitle, StyledIntroDiv, StyledInfoDiv, } from './styledComponents/StyledDashboard';

export const Preface = () => {
    return (
        <>
            <StyledAppTitle>The star wars Integalactic mobility shop</StyledAppTitle>
            <StyledIntroDiv>{Introduction}</StyledIntroDiv>
            <StyledInfoDiv>{additionalInfo}</StyledInfoDiv>
        </>
    );
}