import React, {
  Suspense,
  Fragment,
  lazy,
} from "react";

import {
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import AdminGuard from "./components/AdminGuard";
import AuthGuard from "./components/AuthGuard";
import GuestGuard from "./components/GuestGuard";
import LoadingScreen from "./components/LoadingScreen";
import DashboardLayout from "./layouts/Dashboard";
import MainLayout from "./layouts/MainLayout";
import { WithLeftSidebar } from "./layouts/PatientPortal";


export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("./screens/errors/NotFound")),
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: DashboardLayout,
    path: "/protected-area",
    component: lazy(() => import("./screens/errors/Restricted")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/login_client",
    component: lazy(() => import("./screens/Auth/Login")),
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: DashboardLayout,
    path: "/dashboard",
    component: lazy(() => import("./screens/Client/Home/Home")),
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: DashboardLayout,
    path: "/patients/:patientId",
    component: lazy(() => import("./screens/Patient")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: "/contact",
    component: lazy(() => import("./screens/Contact")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/forgot-password",
    component: lazy(() => import("./screens/ForgetPassword")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/password/reset/:userId/:token",
    component: lazy(() => import("./screens/ResetPassword")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/email/confirmation/:userId/:token",
    component: lazy(() => import("./screens/EmailConfirmation")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/signup_client",
    component: lazy(() => import("./screens/Auth/SignUp")),
  },
  {
    path: "/manage",
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: "/manage/email-patients",
        component: lazy(() => import("./screens/Client/Manage/EmailPatients")),
      },
      {
        exact: true,
        path: "/manage/fax",
        component: lazy(() => import("./screens/Client/Manage/Fax")),
      },
      {
        exact: true,
        path: "/manage/merge-patient",
        component: lazy(() => import("./screens/Client/Manage/MergePatient")),
      },
      {
        exact: true,
        path: "/manage/delete-patient",
        component: lazy(() => import("./screens/Client/Manage/DeletePatient")),
      },
      {
        exact: true,
        path: "/manage/patient-search",
        component: lazy(() => import("./screens/Client/Manage/PatientSearch")),
      },
      {
        exact: true,
        path: "/manage/support",
        component: lazy(() => import("./screens/Client/Manage/Support")),
      },
      {
        path: "/manage/accounting-search",
        component: lazy(() => import("./screens/Client/Manage/AccountingSearch")),
      },
    ],
  },
  {
    path: "/setup",
    guard: AdminGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: "/setup/accounting-types",
        component: lazy(() => import("./screens/Client/Setup/AccountingTypes")),
      },
      {
        exact: true,
        path: "/setup/appointment-types",
        component: lazy(() => import("./screens/Client/Setup/AppointmentTypes")),
      },
      {
        exact: true,
        path: "/setup/integrations",
        component: lazy(() => import("./screens/Client/Setup/Integrations")),
      },
      {
        exact: true,
        path: "/setup/appoinment-user-types",
        component: lazy(() => import("./screens/Client/Setup/AppointmentTypesUser")),
      },
      {
        exact: true,
        path: "/setup/appoinment-user-types",
        component: lazy(() => import("./screens/Client/Setup/AppointmentTypesUser")),
      },
      {
        exact: true,
        path: "/setup/backup",
        component: lazy(() => import("./screens/Client/Setup/Backup")),
      },
      {
        exact: true,
        path: "/setup/configuration",
        component: lazy(() => import("./screens/Client/Setup/Configuration")),
      },
      {
        exact: true,
        path: "/setup/ctp-codes",
        component: lazy(() => import("./screens/Client/Setup/CTPcodes")),
      },
      {
        exact: true,
        path: "/setup/drugs",
        component: lazy(() => import("./screens/Client/Setup/Drugs")),
      },
      {
        exact: true,
        path: "/setup/forms",
        component: lazy(() => import("./screens/Client/Setup/Forms")),
      },
      {
        exact: true,
        path: "/setup/handouts",
        component: lazy(() => import("./screens/Client/Setup/Handouts")),
      },
      {
        exact: true,
        path: "/setup/icd-codes",
        component: lazy(() => import("./screens/Client/Setup/ICDcodes")),
      },
      {
        exact: true,
        path: "/setup/integrations",
        component: lazy(() => import("./screens/Client/Setup/Integrations")),
      },
      {
        exact: true,
        path: "/setup/lab-ranges",
        component: lazy(() => import("./screens/Client/Setup/LabRanges")),
      },
      {
        exact: true,
        path: "/setup/patient-portal-header",
        component: lazy(() => import("./screens/Client/Setup/PortalHeader")),
      },
      {
        exact: true,
        path: "/setup/schedule",
        component: lazy(() => import("./screens/Client/Setup/Schedule")),
      },
      {
        exact: true,
        path: "/setup/users",
        component: lazy(() => import("./screens/Client/Setup/Users")),
      },
    ],
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: "/reports",
    routes: [
      {
        exact: true,
        path: "/reports",
        component: lazy(() => import("./screens/Client/Reports")),
      },
      {
        path: "/reports/report-finance",
        component: lazy(() => import("./screens/Client/Setup/ReportFinance")),
      },
      {
        path: "/reports/report-finance-detail/:dateFrom/:dateTo",
        component: lazy(() => import("./screens/Client/Setup/ReportFinanceDetail")),
      },
    ],
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: DashboardLayout,
    path: "/process-lab/:userId",
    component: lazy(() => import("./screens/ProcessLab")),
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: DashboardLayout,
    path: "/process-message/:userId",
    component: lazy(() => import("./screens/ProcessMessage")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/signup/:clientCode",
    component: lazy(() => import("./screens/patient-portal/auth/Signup")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/login/:clientCode",
    component: lazy(() => import("./screens/patient-portal/auth/Login")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: "/forgot/:clientCode",
    component: lazy(() => import("./screens/patient-portal/auth/ForgotPassword")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: "/patient/password/reset/:patientId/:token",
    component: lazy(() => import("./screens/patient-portal/ResetPassword")),
  },
  {
    path: "/patient",
    guard: AuthGuard,
    layout: WithLeftSidebar,
    routes: [
      {
        exact: true,
        guard: AuthGuard,
        path: "/patient",
        component: lazy(() => import("./screens/patient-portal/Home/Home")),
      },
      {
        guard: AuthGuard,
        path: "/patient/messages",
        component: lazy(() => import("./screens/patient-portal/Messages")),
      },
      {
        guard: AuthGuard,
        path: "/patient/encounters",
        component: lazy(() => import("./screens/patient-portal/Encounters")),
      },
      {
        guard: AuthGuard,
        path: "/patient/handouts",
        component: lazy(() => import("./screens/patient-portal/Handouts")),
      },
      {
        guard: AuthGuard,
        path: "/patient/labs",
        component: lazy(() => import("./screens/patient-portal/Labs")),
      },
      {
        guard: AuthGuard,
        path: "/patient/labs-requisition",
        component: lazy(() => import("./screens/patient-portal/Requisition")),
      },
      {
        guard: AuthGuard,
        path: "/patient/billing",
        component: lazy(() => import("./screens/patient-portal/Billing")),
      },
      {
        guard: AuthGuard,
        path: "/patient/payment-methods",
        component: lazy(() => import("./screens/patient-portal/PaymentMethods")),
      },
      {
        guard: AuthGuard,
        path: "/patient/allergies",
        component: lazy(() => import("./screens/patient-portal/Allergies")),
      },
      {
        guard: AuthGuard,
        path: "/patient/prescriptions",
        component: lazy(() => import("./screens/patient-portal/Prescriptions")),
      },
      {
        guard: AuthGuard,
        path: "/patient/pharmacies",
        component: lazy(() => import("./screens/patient-portal/Pharmacies")),
      },
      {
        guard: AuthGuard,
        path: "/patient/appointments",
        component: lazy(() => import("./screens/patient-portal/Appointments")),
      },
      {
        guard: AuthGuard,
        path: "/patient/profile",
        component: lazy(() => import("./screens/patient-portal/Profile")),
      },
      {
        guard: AuthGuard,
        path: "/patient/forms",
        component: lazy(() => import("./screens/patient-portal/Forms")),
      },
    ],
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: DashboardLayout,
    path: "/agreement",
    component: lazy(() => import("./screens/Agreement")),
  },
  {
    exact: true,
    guard: AuthGuard,
    layout: DashboardLayout,
    path: "/myself",
    component: lazy(() => import("./screens/Client/Myself")),
  },
  {
    path: "*",
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("./screens/Home")),
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

export default routes;