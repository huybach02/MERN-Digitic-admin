import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {useHistory, Redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";

const PrivateRoutes = ({path, component}) => {
  const {user} = React.useContext(UserContext);

  if (user && user.isAuthenticated) {
    return (
      <div>
        <Route path={path} component={component}></Route>
      </div>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
};

export default PrivateRoutes;
