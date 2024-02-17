import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: "pk.eyJ1IjoibWF0aWFzYWdiZW5pdGV6IiwiYSI6ImNsc3FkNGtyeTEycG4yaW4xMHFwcXJ6cnEifQ.E0km9IwiIABM4d_IhxunWA",
    },
});

export default searchApi;