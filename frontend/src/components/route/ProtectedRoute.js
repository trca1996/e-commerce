import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin && user.role !== "admin") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
