import React from "react";
import { RotatingSquare } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader">
      <RotatingSquare ariaLabel="rotating-square" visible={true} color="grey" />
    </div>
  );
}
