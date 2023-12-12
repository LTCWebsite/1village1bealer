import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import { ProtectRoute } from "../Components/Auth/ProtectRoute";
import Register from "../Pages/Register/Register";
import RegisterOTP from "../Pages/Register/RegisterOTP";

function router() {

  const role = localStorage.getItem("role");

  return (
    <>
      <BrowserRouter>
        <Switch>
            <Switch>
              <Route path={"/"} component={Login} exact />
              <Route path={"/register"} component={Register} exact />
              {/* <Route path={"/registerotp"} component={RegisterOTP} exact /> */}
              <ProtectRoute path={"/home"} component={Home} />
            </Switch>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default router;
