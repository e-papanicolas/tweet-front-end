import React from "react";
import { useState } from "react";
import Loader from "./Loader";

export const IsLoadingHOC = (WrappedComponent, loadingMessage) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(true);
    const setLoadingState = (isComponentLoading) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && <Loader message={loadingMessage} />}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  }
  return HOC;
};

export default IsLoadingHOC;
