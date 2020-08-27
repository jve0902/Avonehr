import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RouteWithLayout from "./RouteWithLayout";
import PrivateRouteWithLayout from "./PrivateRouteWithLayout";
import Contact from "../screens/Contact";
import ForgetPassword from "../screens/ForgetPassword";
import EmailConfirmation from "../screens/EmailConfirmation";
import Home from "../screens/Home";
import Login from "../screens/Auth/Login";
import NotFound from "../screens/NotFound";
import ResetPassword from "../screens/ResetPassword";
import SignUp from "../screens/Auth/SignUp";
import UserSignUp from "../screens/Auth/UserSignUp";
import { AppointmentTypes } from "../screens/AppointmentTypes";
import { AppointmentTypesUsers } from "../screens/AppointmentTypesUser";
import Agreement from "../screens/Agreement";

import { Main } from "../layouts";
import { AuthProvider } from "../providers/AuthProvider";
import Dashboard from "../layouts/Dashboard";

const history = createBrowserHistory();

class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <AuthProvider>
          <Switch>
            <RouteWithLayout layout={Main} path="/" component={Home} exact />
            <RouteWithLayout
              layout={Main}
              path="/agreement"
              component={Agreement}
            />
            <RouteWithLayout
              layout={Main}
              path="/contact"
              component={Contact}
            />
            <RouteWithLayout
              layout={Main}
              path="/forgot-password"
              component={ForgetPassword}
              exact
            />
            <RouteWithLayout
              layout={Main}
              path="/password/reset/:userId/:token"
              component={ResetPassword}
              exact
            />
            <RouteWithLayout
              layout={Main}
              path="/email/confirmation/:userId/:token"
              component={EmailConfirmation}
              exact
            />
            <RouteWithLayout
              layout={Main}
              path="/signup_client"
              component={SignUp}
            />
            <RouteWithLayout
              layout={Main}
              path="/signup"
              component={UserSignUp}
            />
            <RouteWithLayout
              layout={Main}
              path="/login_client"
              component={Login}
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/dashboard/appoinment-types"
              component={AppointmentTypes}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/dashboard/appoinment-types/users"
              component={AppointmentTypesUsers}
              exact
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}

export default AppRouter;
