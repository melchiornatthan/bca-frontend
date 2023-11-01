import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element, isAuthorized }) => {
  if (isAuthorized) {
    return <Route exact path={path} element={element}></Route>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
