import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

export const Mapify = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  );
};
