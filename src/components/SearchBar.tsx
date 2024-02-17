import React, { ChangeEvent, useContext } from "react";
import { useRef } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlacesContext);
  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 1000);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Search for a place..."
        onChange={onQueryChanged}
      />

      <SearchResults />
    </div>
  );
};
