/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy, Suspense } from "react";

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);
  const component = (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
  return component;
};

export default loadable;
