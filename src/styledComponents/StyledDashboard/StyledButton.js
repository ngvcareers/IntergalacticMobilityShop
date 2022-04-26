import Styled from 'styled-components';
import starShip from './starShip.jpg';
import skyHopper from './Skyhopper.jpg';
export const StyledStarShipButton = Styled.button`
margin: 5px;
height: 200px;
background: url(${starShip});
background-size: 400px;
width: 400px;`;
export const StyledVehicleButton = Styled.button`
margin: 5px;
height: 200px;
background: url(${skyHopper});
background-size: 400px;
width: 400px;`;