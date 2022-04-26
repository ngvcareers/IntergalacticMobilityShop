import React, { useState, useEffect, useContext } from 'react';
import { StyledFilterMainDiv, StyledFilterChildDiv, StyledFilterButtonDiv, StyledFilterIndButton } from './styledComponents/StyledDashboard';
import Select from 'react-select';
import { ResourcesContext } from './CommonContext';
import { getFilmsOptions, getPriceOptions, getPassengerCountOptions, filterHandler } from './util/FilterUtils';
import { Alert } from './Alert';

const customStyles = {
    option: (provided) => ({
        ...provided,
        color: 'black',
        padding: 20,
    }),
};

const FilterToMemoize = ({ getStatus }) => {
    const [resource, setResources] = useState();
    const { starShips, vehicles } = useContext(ResourcesContext);
    const [films, setFilms] = useState();
    const [filmOptions, setFilmsOptions] = useState();
    const [passengerCount, setPassengerCount] = useState(0);
    const { minPrice, maxPrice } = getPriceOptions();
    const { minPassengerCount, maxPassengerCount } = getPassengerCountOptions();
    const [priceSelected, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setPrice(maxPrice);
    }, [maxPrice]);
    useEffect(() => {
        setPassengerCount(maxPassengerCount);
    }, [maxPassengerCount]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 9000);
        return () => clearTimeout(timer);
    }, []);
    const handleResourceChange = (event) => {
        setResources(event);
    }
    const handleFilmsChange = (event) => {
        setFilms(event);
    }
    const handlePassengerCountChange = () => {
        const element = document.getElementById("passengerCount").value;
        setPassengerCount(element);
    }
    const handlePriceChange = () => {
        const element = document.getElementById("price").value;
        setPrice(element);
    }
    const handleFilter = () => {
        const filteredResource = filterHandler({ starShips, vehicles }, resource, films, priceSelected, passengerCount);
        getStatus(filteredResource, true);
    }
    const handleClearFilter = () => {
        setFilms([]);
        setResources([]);
        setPassengerCount(maxPassengerCount);
        setPrice(maxPrice);
        getStatus([], false);
    }
    async function getFilms() {
        const resList = await fetch('/api/films/');
        const filmsList = await resList.json();
        return filmsList.results;
    }
    useEffect(() => {
        (async () => {
            const getList = await getFilms();
            const options = getList.map(list => {
                return ({ value: list.url, label: list.title })
            });
            setFilmsOptions(options);
        })();
    }, []);
    return (<>
        {loading &&
            <Alert close={false} handleClose={() => setLoading(false)}>
                Loading... Please wait
            </Alert>}
        <h3 style={{ margin: '5px' }}>Filters:</h3>
        <StyledFilterMainDiv>
            <StyledFilterChildDiv>
                <div>
                    Resources: {` `}
                </div>
                <Select
                    styles={customStyles}
                    isMulti
                    name="colors"
                    options={
                        [{ value: 'starships', label: 'Starships' },
                        { value: 'vehicle', label: 'Vehicles' },]}
                    closeMenuOnSelect={false}
                    value={resource}
                    onChange={handleResourceChange}
                />
            </StyledFilterChildDiv>
            <div style={{ display: 'flex', flexFlow: 'column wrap', margin: '0 10px', width: '250px' }}>
                <div>
                    Films: {` `}
                </div>
                <Select
                    styles={customStyles}
                    width='40px'
                    isMulti
                    name="films"
                    options={getFilmsOptions(resource, filmOptions)}
                    closeMenuOnSelect={false}
                    value={films}
                    onChange={handleFilmsChange}
                />
            </div>
            <StyledFilterChildDiv>
                <div>
                    Passenger Count: {` `}
                </div>
                <input type='range' id="passengerCount" name="passengerCount" min={minPassengerCount} max={maxPassengerCount}
                    onChange={(event) => handlePassengerCountChange(event)}></input>
                <input type="text" value={passengerCount} disabled />
            </StyledFilterChildDiv>
            <StyledFilterChildDiv>
                <div>
                    Price: {` `}
                </div>
                <input type='range' id="price" name="price" min={minPrice} max={maxPrice}
                    onChange={(event) => handlePriceChange(event)}></input>
                <input type="text" value={priceSelected} disabled />
            </StyledFilterChildDiv>
            <StyledFilterButtonDiv>
                <div>
                    <StyledFilterIndButton onClick={handleFilter}>
                        Apply
                    </StyledFilterIndButton>
                </div>
                <div>
                    <StyledFilterIndButton onClick={handleClearFilter}>
                        Clear
                    </StyledFilterIndButton>
                </div>
            </StyledFilterButtonDiv>
        </StyledFilterMainDiv >
    </>
    )
};
export const Filter = React.memo(FilterToMemoize);