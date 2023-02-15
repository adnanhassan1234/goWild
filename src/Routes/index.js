import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ElementControl from "Components/ElementControl";
import routes from "./routes";

const ClientRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const { path, subRoutes, component, layout } = route;
          if (subRoutes && subRoutes.length > 0) {
            return (
              <Route key={`route_${index}`}>
                {subRoutes.map((subRoute, subIndex) => {
                  return (
                    <Route
                      key={`subroute_${subIndex}`}
                      exact
                      path={`${route.path}${subRoute.path}`}
                      element={<ElementControl Component={subRoute.component} Layout={layout} />}
                    />
                  );
                })}
              </Route>
            );
          }
          return (
            <Route
              key={`route_${index}`}
              exact
              path={path}
              element={<ElementControl Component={component} Layout={layout} />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default ClientRoutes;
