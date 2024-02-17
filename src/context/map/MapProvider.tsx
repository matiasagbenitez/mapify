import { useContext, useEffect, useReducer } from "react";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;
      const popup = new Popup().setHTML(`
        <b>${place.text_es}</b>
        <p>${place.place_name_es}</p>
      `);

      const marker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(marker);
    }

    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup()
      .setLngLat(map.getCenter())
      .setHTML(`<b>My location</b>`)
      .addTo(map);

    new Marker({
      color: "#0D6EFD",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates } = geometry;

    const kms = Math.round((distance / 1000) * 100) / 100;
    const mins = Math.floor(duration / 60);

    const bounds = new LngLatBounds(start, start);
    for (const coord of coordinates) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    new Popup()
      .setLngLat(end)
      // .setHTML(`The route is ${kms} km long and will take you ${mins} minutes`)
      .addTo(state.map!);

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates,
            },
          },
        ],
      },
    };

    // remove polyline if it exists}
    if (state.map?.getSource("RouteString")) {
      state.map?.removeLayer("RouteLayer");
      state.map?.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);

    state.map?.addLayer({
      id: "RouteLayer",
      type: "line",
      source: "RouteString",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#0D6EFD",
        "line-width": 8,
      },
    });

  };

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
