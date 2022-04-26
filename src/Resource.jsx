import { useParams, useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { ResourcesContext } from "./CommonContext";
import { StyledData, StyledTable } from "./styledComponents/StyledDashboard";
export const Resource = () => {
    const { resource } = useParams();
    const navigate = useNavigate();
    const { starShips, vehicles } = useContext(ResourcesContext);
    const resources = [...starShips, ...vehicles];
    const resourceToView = resources.filter((res) => res.name.replace(/\//gi, '$') === resource);
    const getDate = (givenDate) => {
        return `${new Date(givenDate).getMonth()}/${new Date(givenDate).getDate()}/ ${new Date(givenDate).getUTCFullYear()}`;
    }
    function displayIndividualResource() {
        const { model, pilots, passengers, consumables, hyperdrive_rating, cargo_capacity, manufacturer, cost_in_credits, edited, crew, length, created, films } = resourceToView[0];
        const createdDate = getDate(created);
        const editedDate = getDate(edited);
        return (
            <>
                <StyledTable>
                    <caption><h1>{resource}</h1></caption>
                    <tbody>
                        <tr>
                            <StyledData> Model</StyledData>
                            <StyledData>{model}</StyledData>
                        </tr>
                        <tr>
                            <StyledData> Pilots</StyledData>
                            <StyledData>{pilots.length || 0}</StyledData>
                        </tr>
                        <tr>
                            <StyledData> Passengers</StyledData>
                            <StyledData>{passengers}</StyledData>
                        </tr>
                        <tr>
                            <StyledData> Consumables</StyledData>
                            <StyledData>{consumables}</StyledData>
                        </tr>
                        <tr>
                            <StyledData>Cargo Capacity</StyledData>
                            <StyledData>{cargo_capacity}</StyledData>
                        </tr>
                        <tr>
                            <StyledData>Hyper Drive Rating</StyledData>
                            <StyledData>{hyperdrive_rating}</StyledData>
                        </tr>
                        <tr>
                            <StyledData> Cost in credits</StyledData>
                            <StyledData>{cost_in_credits}</StyledData>
                        </tr>
                        <tr>
                            <StyledData> Manufacturer</StyledData>
                            <StyledData>{manufacturer}</StyledData>
                        </tr>
                        <tr>
                            <StyledData> Created Date:</StyledData>
                            <StyledData>{createdDate}</StyledData>
                        </tr>
                        <tr>
                            <StyledData>Edited</StyledData>
                            <StyledData>{editedDate}</StyledData>
                        </tr>
                        <tr>
                            <StyledData>Crew</StyledData>
                            <StyledData>{crew}</StyledData>
                        </tr>
                        <tr>
                            <StyledData>Length</StyledData>
                            <StyledData>{length}</StyledData>
                        </tr>
                        <tr>
                            <StyledData rowSpan={films.length + 1}> Films</StyledData>
                        </tr>
                        {films.map((film, index) => {
                            return (
                                <tr key={`film_${index}`}>
                                    <StyledData colSpan={films.length + 1}>{film}</StyledData>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan='2' align='center'><button onClick={() => navigate(-1)}>Go back</button></td>
                        </tr>
                    </tbody>
                </StyledTable >
            </>
        );
    };
    return (displayIndividualResource());
}