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
import { DoctorHome } from "../screens/Client/Home";
import { AppointmentTypes } from "../screens/Client/AppointmentTypes";
import { AppointmentTypesUsers } from "../screens/Client/AppointmentTypesUser";
import {
  AccountingSearch,
  EmailPatients,
  Fax,
  MergePatient,
  DeletePatient,
  PatientSearch,
  Support,
} from "../screens/Client/Manage";
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
              path="/dashboard"
              component={DoctorHome}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/appoinment-types"
              component={AppointmentTypes}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/search"
              component={AccountingSearch}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/email-patients"
              component={EmailPatients}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/fax"
              component={Fax}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/merge-patient"
              component={MergePatient}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/delete-patient"
              component={DeletePatient}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/patient-search"
              component={PatientSearch}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/manage/support"
              component={Support}
              exact
            />
            <PrivateRouteWithLayout
              layout={Dashboard}
              path="/appoinment-types/users"
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
