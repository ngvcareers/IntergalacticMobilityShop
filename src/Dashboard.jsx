import React, { useState, useContext } from 'react';
import { ResourcesContext } from './CommonContext';
import { Search } from './Search';
import { Filter } from './Filter';
import { ResourceDisplayComponent } from './ResourceDisplayComponent';
import { StarshipViewButton } from './StarshipViewButton';
import { StyledFlexDiv, StyledH1 } from './styledComponents/StyledDashboard';
import { VehicleViewButton } from './VehicleViewButton';
import { Alert } from './Alert';
import { Preface } from './Preface';

export const Dashboard = () => {
    const [starShipStatus, setStarShip] = useState(false);
    const [vehicleStatus, setVehicle] = useState(false);
    const [search, setSearch] = useState(false);
    const [resources, setResources] = useState([]);
    const [searchAlertStatus, setSearchAlert] = useState(false);
    const [filter, setFilter] = useState(false);
    const [filterAlert, setFilterAlert] = useState(false);
    const [displayAlert, setDisplayAlert] = useState(false);
    const { starShips, vehicles } = useContext(ResourcesContext);
    const setStarShipStatus = () => {
        setStarShip(true);
        setVehicle(false);
        setDisplayAlert(true);
    }
    const setVehicleStatus = () => {
        setStarShip(false);
        setVehicle(true);
        setDisplayAlert(true);
    };
    const getSearchStatus = (resources, status) => {
        if (resources.length) {
            setResources(resources);
        }
        if (status && resources.length < 1) {
            setSearchAlert(true);
        }
        setSearch(status);
        status && setStarShip(false);
        status && setVehicle(false);
    }
    const getFilterStatus = (resources, status) => {
        if (resources.length) {
            setResources(resources);
        }
        if (status && resources.length < 1) {
            setFilterAlert(true);
        }
        setFilter(status);
        status && setStarShip(false);
        status && setVehicle(false);
    }
    return (
        <>
            <Preface />
            {displayAlert &&
                <Alert handleClose={() => setDisplayAlert(false)}>
                    Please scroll down to view the resources displayed below..
                </Alert>}
            <StyledFlexDiv>
                <Search getStatus={getSearchStatus} />
            </StyledFlexDiv>
            <StyledFlexDiv>
                <Filter getStatus={getFilterStatus} />
            </StyledFlexDiv>
            {(search || filter) ?
                ((searchAlertStatus || filterAlert) ?
                    <StyledFlexDiv>
                        <Alert handleClose={() => {
                            setSearchAlert(false);
                            setSearch(false);
                            setFilter(false);
                            setFilterAlert(false)
                        }}>
                            No resources available
                        </Alert>
                    </StyledFlexDiv>
                    :
                    (<>
                        <StyledFlexDiv>
                            <StyledH1>RESULTS</StyledH1>
                        </StyledFlexDiv>
                        <StyledFlexDiv>
                            <ResourceDisplayComponent resource={resources} />
                        </StyledFlexDiv>
                    </>))
                : null
            }
            {(!search && !filter) && (
                <>
                    <div style={{ textAlign: 'center', fontSize: '18px' }}>Click any of the below images to know more about them</div>
                    <StyledFlexDiv>
                        <StarshipViewButton handleClick={setStarShipStatus}>
                            <StyledH1>Starships</StyledH1>
                        </StarshipViewButton>
                        <VehicleViewButton handleClick={setVehicleStatus}>
                            <StyledH1>Vehicles</StyledH1>
                        </VehicleViewButton>
                    </StyledFlexDiv>
                    <StyledFlexDiv>
                        {starShipStatus && (<div>
                            <StyledH1>Listing all the available starships </StyledH1>
                            <ResourceDisplayComponent resource={starShips} />
                        </div>
                        )}
                        {vehicleStatus && (
                            <div>
                                <StyledH1>Listing all the available vehicles </StyledH1>
                                <ResourceDisplayComponent resource={vehicles} />
                            </div>)}
                    </StyledFlexDiv>
                </>)
            }
        </>
    );
}