import { PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

export const Mapify = () => {
  return (
    <PlacesProvider>
      <HomeScreen />
    </PlacesProvider>
  );
};
