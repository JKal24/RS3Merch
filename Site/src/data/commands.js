import { api } from './api';

export async function getItems(filter, param) {

    switch (filter) {
        case 'buylimit':
            return (await api.get(`/BuyLimitSearch/${param}`)).data;
        case 'type':
            return (await api.get(`/SearchByTypes/${param}`)).data;
        case 'rising':
            return (await api.get('/RisingItemSearch')).data;
        case 'falling':
            return (await api.get('/FallingItemSearch')).data;
        case 'input':
            return (await api.get(`/SearchByKeyword/${param}`)).data;
        default:
            const data = await api.get('/RandomListing');
            return (data).data;            
    }
}

// Nav handlers

export async function getBuyLimits() {
    const data = (await api.get('/BuyLimitListing')).data;
    return data;
}

export async function getTypes() {
    return (await api.get('/TypeListing')).data;
}

// Update data

export async function doUpdate() {
    api.get('/Update');
}