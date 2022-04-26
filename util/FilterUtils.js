import { useContext } from 'react';
import { ResourcesContext } from '../CommonContext';

export function getResources(resourceReceived) {
    const { starShips, vehicles } = useContext(ResourcesContext);
    let resources = [];
    if (resourceReceived && resourceReceived.length === 1) {
        const { value } = resourceReceived;
        resources = (value === 'starships' ? [starShips] : [vehicles]);
    } else {
        resources.push(starShips);
        resources.push(vehicles);
    }
    return resources.flat();
}
export function getFilmsOptions(resourceReceived, filmsReceived) {
    let resources = null;
    let filmsToDisplay = [];
    let filmsFromRes = [];
    resources = getResources(resourceReceived);
    filmsFromRes = resources.map(temp => temp.films);
    filmsFromRes = [...new Set(filmsFromRes.flat())];
    if (resources.length && filmsReceived && filmsReceived.length) {
        filmsToDisplay = filmsReceived.filter(films => filmsFromRes.includes(films.value));
    }
    return filmsToDisplay;
}
export function getPriceOptions(resourceReceived) {
    let resources = null;
    let priceToDisplay = [];
    let priceFromRes = [];
    resources = getResources(resourceReceived);
    priceFromRes = resources.map((res) => res.cost_in_credits);
    priceFromRes = [...new Set(priceFromRes.flat())];
    const priceInNum = priceFromRes.map((price) => parseInt(price));
    const sortedPrice = priceInNum.sort(function (a, b) { return a - b });
    priceToDisplay = sortedPrice.filter((price) => {
        if (!isNaN(price)) {
            return price;
        }
        else {
            return;
        }
    });
    return ({ minPrice: `${priceToDisplay[0]}`, maxPrice: `${priceToDisplay.slice(-1)[0]}` });
}
export function getPassengerCountOptions(resourceReceived) {
    let resources = null;
    let passengerCountToDisplay = [];
    let passengerCountFromRes = [];
    resources = getResources(resourceReceived);
    const passCount = resources.map((res) => res.passengers);
    passengerCountFromRes = [...new Set(passCount.flat())];
    const countInNum = passengerCountFromRes.map((count) => parseInt(count));
    passengerCountToDisplay = countInNum.filter((count) => {
        if (!isNaN(count) || count === 0) {
            return count;
        }
        else {
            return;
        }
    });
    passengerCountToDisplay.sort(function (a, b) { return a - b });
    const minPassengerCount = countInNum.includes(0) ? '0' : `${passengerCountToDisplay[0]}`
    return ({ minPassengerCount, maxPassengerCount: `${passengerCountToDisplay.slice(-1)[0]}` });
}
export function filterHandler({ starShips, vehicles }, resourceReceived, filmsReceived, priceReceived, passengerCountReceived) {
    let resourceToFilter = [];
    let filteredByPrice = [];
    let filteredByPC = [];
    if (resourceReceived && resourceReceived.length === 1) {
        const { value } = resourceReceived[0];
        resourceToFilter = value === 'starships' ? starShips : vehicles;
    } else {
        resourceToFilter.push(starShips);
        resourceToFilter.push(vehicles);
        resourceToFilter = resourceToFilter.flat();
    }
    if (priceReceived && priceReceived.length) {
        filteredByPrice = resourceToFilter.filter((resource) => {
            return (parseInt(resource.cost_in_credits) <= parseInt(priceReceived) ||
                isNaN(parseInt(resource.cost_in_credits)));
        }
        );
        resourceToFilter = filteredByPrice;
    }
    else {
        resourceToFilter = filteredByPrice;
    }
    if (passengerCountReceived && passengerCountReceived.length) {
        filteredByPC = resourceToFilter.filter((resource) => {
            return (parseInt(resource.passengers) <= parseInt(passengerCountReceived) ||
                isNaN(parseInt(resource.passengers)));
        }
        );
        resourceToFilter = filteredByPC;
    }
    else {
        resourceToFilter = filteredByPC;
    }
    if (filmsReceived && filmsReceived.length) {
        let tempResources = [];
        const filmsToFilter = filmsReceived.map((film) => film.value);
        for (let i = 0; i < resourceToFilter.length; i++) {
            let tempFilms = resourceToFilter[i].films;
            for (let j = 0; j < filmsToFilter.length; j++) {
                if (tempFilms.includes(filmsToFilter[j])) {
                    tempResources.push(resourceToFilter[i]);
                    break;
                }
            }
        }
        resourceToFilter = tempResources;
    }
    return resourceToFilter;
}