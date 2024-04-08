import { Route, Navigate, RouteProps } from "react-router-dom";

import { APICore } from "../helpers/api/apiCore";

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
  const api = new APICore();

  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        if (api.isUserAuthenticated() === false) {
          // not logged in so redirect to login page with the return url
          return (
            <Navigate
              // state={from: props['path']}
              to={{
                pathname: "/auth/login",
                // state: { from: props['path'] },
              }}
            />
          );
        }
        
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
