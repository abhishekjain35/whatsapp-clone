import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Navigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoadingAuth(false);
    });
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        loadingAuth ? (
          <h1>Loading...</h1>
        ) : authenticated ? (
          <Component {...props} />
        ) : (
          <div>
            <Navigate to={{ pathname: "/signin" }} />
          </div>
        )
      }
    />
  );
};

export default AuthRoute;
