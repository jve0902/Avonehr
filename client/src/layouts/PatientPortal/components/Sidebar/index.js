import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Icon from "@mdi/react";
import {
  mdiChartBox,
  mdiAccount,
  mdiMessage,
  mdiHome,
  mdiTestTube,
  mdiAllergy,
  mdiPrescription,
  mdiPharmacy,
  mdiCalendar,
  mdiFormSelect,
  mdiLogoutVariant
} from "@mdi/js";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PaymentIcon from "@material-ui/icons/Payment";
import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)"
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = (props) => {
  const {
    open,
    variant,
    isAuth,
    logout,
    onClose,
    className,
    user,
    ...rest
  } = props;
  const classes = useStyles();

  const pages = [
    {
      title: "Home",
      href: "/patient",
      icon: <Icon path={mdiHome} size={1} horizontal vertical rotate={180} />
    },
    {
      title: "Messages",
      href: "/messages",
      icon: <Icon path={mdiMessage} size={1} horizontal vertical rotate={180} />
    },
    {
      title: "Encounters",
      href: "/encounters",
      icon: <SettingsIcon />
    },
    {
      title: "Handouts",
      href: "/handouts",
      icon: (
        <Icon path={mdiChartBox} size={1} horizontal vertical rotate={180} />
      )
    },
    {
      title: "Labs/Documents",
      href: "/labs",
      icon: (
        <Icon path={mdiTestTube} size={1} horizontal vertical rotate={180} />
      )
    },
    {
      title: "Labs/Requisition",
      href: "/labs-requisition",
      icon: (
        <Icon path={mdiTestTube} size={1} horizontal vertical rotate={180} />
      )
    },
    {
      title: "Billing",
      href: "/billing",
      icon: <ReceiptIcon />
    },
    {
      title: "Payment Methods",
      href: "/payment-methods",
      icon: <PaymentIcon />
    },
    {
      title: "Allergies",
      href: "/allergies",
      icon: <Icon path={mdiAllergy} size={1} horizontal vertical rotate={180} />
    },
    {
      title: "Prescriptions",
      href: "/prescriptions",
      icon: (
        <Icon
          path={mdiPrescription}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      )
    },
    {
      title: "Pharmacies",
      href: "/pharmacies",
      icon: (
        <Icon path={mdiPharmacy} size={1} horizontal vertical rotate={180} />
      )
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: (
        <Icon path={mdiCalendar} size={1} horizontal vertical rotate={180} />
      )
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <Icon path={mdiAccount} size={1} horizontal vertical rotate={180} />
    },
    {
      title: "Forms",
      href: "/forms",
      icon: (
        <Icon path={mdiFormSelect} size={1} horizontal vertical rotate={180} />
      )
    },
    {
      title: "Signoff",
      href: "/signoff",
      icon: (
        <Icon
          path={mdiLogoutVariant}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      )
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default Sidebar;
