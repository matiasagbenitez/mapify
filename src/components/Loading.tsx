import React from "react";

export const Loading = () => {
  return (
    <div className="loading-map">
      <div className="spinner-border text-secondary" role="status"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
