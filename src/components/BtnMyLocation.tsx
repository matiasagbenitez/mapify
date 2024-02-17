import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";
export const BtnMyLocation = () => {
  const { map } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    if (!map) throw new Error("Map is not ready");
    if (!userLocation) throw new Error("User location is not ready");
    map.flyTo({ center: userLocation });
  };

  return (
    <button
      className="btn btn-primary"
      style={{ position: "absolute", top: "10px", right: "10px", zIndex: 999 }}
      onClick={onClick}
    >
      My location
    </button>
  );
};
