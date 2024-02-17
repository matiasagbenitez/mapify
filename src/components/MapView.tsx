import { useContext, useLayoutEffect, useRef } from "react";
import { Map } from "mapbox-gl";
import { PlacesContext } from "../context";
import { Loading } from "./Loading";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const mapContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapContainer.current!, 
        style: "mapbox://styles/mapbox/streets-v12", 
        center: userLocation,
        zoom: 14, 
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapContainer}
      className="map-container"
      style={{
        height: "100vh",
        left: 0,
        position: "fixed",
        top: 0,
        width: "100%",
      }}
    >
      {userLocation?.join(",")}
    </div>
  );
};
