import React, { useEffect, useState } from 'react';
import { Dashboard } from './Dashboard';
import { ResourcesContext } from './CommonContext';
import { StyledAppDiv } from './styledComponents/StyledDashboard';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Resource } from './Resource';
export const App = () => {
    const [starShips, setStarShips] = useState({});
    const [vehicles, setVehicles] = useState({});
    async function getStarShips() {
        const list = await fetch('/api/starships');
        const starShips = await list.json();
        return starShips.results;
    }
    async function getVehicles() {
        const list = await fetch('/api/vehicles');
        const vehicles = await list.json();
        return vehicles.results;
    }
    useEffect(() => {
        (async () => {
            const getList = await getStarShips();
            setStarShips(getList);
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const getList = await getVehicles();
            setVehicles(getList);
        })();
    }, []);
    return (
        <Router>
            <StyledAppDiv>
                <ResourcesContext.Provider value={{ starShips, vehicles }}>
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                        <Route exact path='/:resource' element={<Resource />} />
                    </Routes>
                </ResourcesContext.Provider>
            </StyledAppDiv>
        </Router>
    );
};