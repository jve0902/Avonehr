import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from "../../../components/common/Card";
import Dialog from "../../../components/Dialog";
import { FirstColumnPatientCards, ThirdColumnPatientCards, FourthColumnPatientCards } from "../../../static/patient";
import BasicInfo from "../BasicInfo";
import Form from "../Form";
import NewTransactionForm from "../Billing/NewTransaction";
import PaymentForm from "../Billing/PaymentForm";

export default function Home() {
  const classes = useStyles();
  const [showPatientInfoDialog, setShowPatientInfoDialog] = useState(false);
  const [showPatientHistoryDialog, setShowPatientHistoryDialog] = useState(false);

  const [showAdminInfoDialog, setShowAdminInfoDialog] = useState(false);
  const [showAdminHistoryDialog, setShowAdminHistoryDialog] = useState(false);

  const [showFormsExpandDialog, setShowFormsExpandDialog] = useState(false);

  const [showNewTransactionDialog, setShowNewTransactionDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const togglePatientInfoDialog = () => {
    setShowPatientInfoDialog(prevState => !prevState)
  }

  const togglePatientHistoryDialog = () => {
    setShowPatientHistoryDialog(prevState => !prevState)
  }

  const toggleAdminHistoryDialog = () => {
    setShowAdminHistoryDialog(prevState => !prevState)
  }

  const toggleFormsExpandDialog = () => {
    setShowFormsExpandDialog(prevState => !prevState)
  }

  const toggleNewTransactionDialog = () => {
    setShowNewTransactionDialog(prevState => !prevState)
  }

  const togglePaymentDialog = () => {
    setShowPaymentDialog(prevState => !prevState)
  }

  const mapPrimaryButtonHandlers = (value) => {
    if(value === 'Patient') {
      return togglePatientHistoryDialog;
    } else if(value === 'Admin Notes') {
      return toggleAdminHistoryDialog;
    } else if(value === 'Forms') {
      return toggleFormsExpandDialog;
    } else if(value === 'Billing') {
      return toggleNewTransactionDialog;
    }
  }

  const mapSecondaryButtonHandlers = (value) => {
    if(value === 'Patient') {
      return togglePatientInfoDialog;
    } else if(value === 'Admin Notes') {
      return toggleAdminHistoryDialog;
    } 
  }

  const mapIconHandlers = (value) => {
    if(value === 'Patient') {
      return togglePatientInfoDialog;
    } else if(value === 'Billing') {
      return togglePaymentDialog;
    } 
  }

  return (
    <>
    <Dialog
      open={showPatientInfoDialog}
      title={" "}
      message={<BasicInfo />}
      applyForm={() => togglePatientInfoDialog()}
      cancelForm={() => togglePatientInfoDialog()}
      hideActions={true}
      size={"lg"}
    />
    <Dialog
      open={showPatientHistoryDialog}
      title={"Patient History"}
      message={<h3>History</h3>}
      applyForm={() => togglePatientHistoryDialog()}
      cancelForm={() => togglePatientHistoryDialog()}
      hideActions={true}
      size={"md"}
    />
    <Dialog
      open={showAdminHistoryDialog}
      title={"Admin Notes History"}
      message={<h3>Admin Notes History</h3>}
      applyForm={() => toggleAdminHistoryDialog()}
      cancelForm={() => toggleAdminHistoryDialog()}
      hideActions={true}
      size={"md"}
    />
    <Dialog
      open={showFormsExpandDialog}
      title={" "}
      message={<Form onClose={toggleFormsExpandDialog} />}
      applyForm={() => toggleFormsExpandDialog()}
      cancelForm={() => toggleFormsExpandDialog()}
      hideActions={true}
      size={"lg"}
    />
    <Dialog
      open={showNewTransactionDialog}
      title={" "}
      message={<NewTransactionForm onClose={toggleNewTransactionDialog} />}
      applyForm={() => toggleNewTransactionDialog()}
      cancelForm={() => toggleNewTransactionDialog()}
      hideActions={true}
      size={"md"}
    />
    <Dialog
      open={showPaymentDialog}
      title={" "}
      message={<PaymentForm onClose={togglePaymentDialog} />}
      applyForm={() => togglePaymentDialog()}
      cancelForm={() => togglePaymentDialog()}
      hideActions={true}
      size={"sm"}
    />
    <Grid className={classes.main} container spacing={1}>
      <Grid item md={3} sm={6} xs={12}>
        {FirstColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              data={item.data}
              showActions={item.showActions}
              showSearch={item.showSearch}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
              primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
              secondaryButtonHandler={mapSecondaryButtonHandlers(item.title)}
              iconHandler={mapIconHandlers(item.title)}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Card
          title="Encounters"
          data={[]}
          showActions={true}
          primaryButtonText={"New"}
          secondaryButtonText={"Expand"}
          showSearch={false}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {ThirdColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              data={item.data}
              showActions={item.showActions}
              showSearch={item.showSearch}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {FourthColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              data={item.data}
              showActions={item.showActions}
              showSearch={item.showSearch}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
            />
          )
        })}
      </Grid>
    </Grid>

    <Grid container spacing={1}>
      <Grid item md={6} xs={12}>
        <Card
          title="Documents"
          data={[]}
          showActions={true}
          primaryButtonText={"New"}
          secondaryButtonText={"Expand"}
          showSearch={false}
          primaryButtonHandler={togglePatientInfoDialog}
          secondaryButtonHandler={togglePatientInfoDialog}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Card
          title="All Tests"
          data={[]}
          showActions={true}
          primaryButtonText={"Expand"}
          secondaryButtonText={null}
          showSearch={false}
          primaryButtonHandler={togglePatientInfoDialog}
        />
      </Grid>
    </Grid>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  main: {
      margin: theme.spacing(1, 0, 1, 0),
  },
}))
