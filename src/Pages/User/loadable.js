import React from "react";
import Loader from "Components/Loader";

import loadable from "Utils/loadable";

export default loadable(() => import("./index"), {
  fallback: <Loader isLoading />,
});
