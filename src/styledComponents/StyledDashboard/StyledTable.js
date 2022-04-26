import Styled from 'styled-components';
export const StyledResourcePage = Styled.div`
{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }`;
export const StyledTable = Styled.table`
    border: 1px solid white;
    width: 500px;
    height: fit-content;
    left:30%;
    line-height: 30px;
    position: absolute;
    border-collapse: collapse;
    border-spacing: 0 16px;
  `;
export const StyledData = Styled.td`
    text-align: center;
    border: 1px solid white;
`;
export const StyledRDDiv = Styled.div`
    display: flex;
    position: relative;
    border: 2px solid white;
    width: 850px;
    font-family: Garamond;
    font-size: 20px;
  `;
export const StyledRDFlexDiv = Styled.div`
 display: flex;
 flex-flow: column;
  justify-content: space-evenly;
  `;
export const StyledRDFavDiv = Styled.div`
  position: absolute;
  top: 0;
  right: 0;
  `;
export const StyledLinkDiv = Styled.div`
position: absolute;
 bottom: 0;
 right: 0;
 margin: 0px 3px 6px 0px;
`;
export const StyledRDChildDiv = Styled.div`
  margin: 2px;
  `;