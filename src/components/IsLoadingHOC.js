import React from "react";
import { useState } from "react";
import Loader from "./Loader";

export const IsLoadingHOC = () => {
  function HOC() {
    const [isLoading, setLoading] = useState(true);
    setLoading(!isLoading);

    return <>{isLoading && <Loader />}</>;
  }
  return HOC;
};

export default IsLoadingHOC;
