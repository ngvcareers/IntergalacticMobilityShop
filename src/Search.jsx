import React, { useState, useEffect, useContext } from 'react';
import { ResourcesContext } from './CommonContext';
import { StyledFlexDiv, StyledSearchDiv } from './styledComponents/StyledDashboard';
export const Search = ({ getStatus }) => {
    const [searchText, setSearchText] = useState(null);
    const { starShips, vehicles } = useContext(ResourcesContext);
    useEffect(() => {
        if (searchText) loadResourceTable();
        else {
            getStatus([], false);
            setSearchText(null);
        };
    }, [searchText]);
    function loadResourceTable() {
        const starShipsList = starShips.filter((starShip) => starShip.name.toLowerCase().includes(searchText.toLowerCase()) || starShip.model.toLowerCase().includes(searchText.toLowerCase()));
        const vehiclesList = vehicles.filter((vehicle) => vehicle.name.toLowerCase().includes(searchText.toLowerCase()) || vehicle.model.toLowerCase().includes(searchText.toLowerCase()));
        getStatus([...starShipsList, ...vehiclesList], true);
    }
    return (
        <StyledFlexDiv>
            <h3 style={{ margin: '5px' }}>Search:</h3>
            <StyledSearchDiv type="text" placeholder="search for starships and vehicles"
                onChange={(event) => setSearchText(event.target.value)} />
        </StyledFlexDiv>
    );
};