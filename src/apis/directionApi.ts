import axios from 'axios';

const directionApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: 'false',
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: "pk.eyJ1IjoibWF0aWFzYWdiZW5pdGV6IiwiYSI6ImNsc3FkNGtyeTEycG4yaW4xMHFwcXJ6cnEifQ.E0km9IwiIABM4d_IhxunWA",
    },
});

export default directionApi;