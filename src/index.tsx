import React from "react";
import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl";
import { Mapify } from "./Mapify";
import "./index.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0aWFzYWdiZW5pdGV6IiwiYSI6ImNsc3FkNGtyeTEycG4yaW4xMHFwcXJ6cnEifQ.E0km9IwiIABM4d_IhxunWA";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (!navigator.geolocation) {
  alert("Geolocation is not supported by your browser");
  throw new Error("Geolocation is not supported by your browser");
}

root.render(
  <React.StrictMode>
    <Mapify />
  </React.StrictMode>
);
