import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

//common components
import Card from "../../../components/common/Card";
import Dialog from "../../../components/Dialog";
import { FirstColumnPatientCards, ThirdColumnPatientCards, FourthColumnPatientCards } from "../../../static/patient";

//components
import BasicInfo from "../BasicInfo";
import Form from "../Form";
import NewTransactionForm from "../Billing/NewTransaction";
import PaymentForm from "../Billing/PaymentForm";
import Allergies from "../Allergies";
import MedicalNotes from "../MedicalNotes";
import NewMessageForm from "../Messages/NewMessage";
import DiagnosesForm from "../Diagnoses";
import MedicationsForm from "../Medications";
import RequisitionsForm from "../Requisitions";

//service
import PatientService from "../../../services/patient.service";

export default function Home() {
  const classes = useStyles();
  const inputFile = useRef(null)

  //dialog states
  const [showPatientInfoDialog, setShowPatientInfoDialog] = useState(false);
  const [showPatientHistoryDialog, setShowPatientHistoryDialog] = useState(false);

  const [showAdminHistoryDialog, setShowAdminHistoryDialog] = useState(false);

  const [showFormsExpandDialog, setShowFormsExpandDialog] = useState(false);

  const [showNewTransactionDialog, setShowNewTransactionDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const [showAllergyDialog, setShowAllergyDialog] = useState(false);
  const [showAllergyExpandDialog, setShowAllergyExpandDialog] = useState(false);

  const [showMedicalNotesDialog, setShowMedicalNotesDialog] = useState(false);

  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showMessageExpandDialog, setShowMessageExpandDialog] = useState(false);

  const [showDiagnosesDialog, setShowDiagnosesDialog] = useState(false);
  const [showDiagnosesExpandDialog, setShowDiagnosesExpandDialog] = useState(false);

  const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  const [showMedicationExpandDialog, setShowMedicationExpandDialog] = useState(false);

  const [showRequisitionDialog, setShowRequisitionDialog] = useState(false);
  const [showRequisitionExpandDialog, setShowRequisitionExpandDialog] = useState(false);

  //data states
  const [allergies, setAllergies] = useState([]);
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    fetchAllergies();
    fetchBillings();
  }, []);

  const fetchAllergies = () => {
    PatientService.getAllergies()
    .then((res) => {
      setAllergies(res.data);
    })
  };

  const fetchBillings = () => {
    PatientService.getBillings()
    .then((res) => {
      setBillings(res.data);
    })
  };

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

  const toggleAllergyDialog = () => {
    setShowAllergyDialog(prevState => !prevState)
  }

  const toggleAllergyExpandDialog = () => {
    setShowAllergyExpandDialog(prevState => !prevState)
  }

  const toggleMedicalNotesDialog = () => {
    setShowMedicalNotesDialog(prevState => !prevState)
  }

  const toggleMessageDialog = () => {
    setShowMessageDialog(prevState => !prevState)
  }

  const toggleMessageExpandDialog = () => {
    setShowMessageExpandDialog(prevState => !prevState)
  }

  const toggleMedicationDialog = () => {
    setShowMedicationDialog(prevState => !prevState)
  }

  const toggleMedicationExpandDialog = () => {
    setShowMedicationExpandDialog(prevState => !prevState)
  }

  const toggleDiagnosesDialog = () => {
    setShowDiagnosesDialog(prevState => !prevState)
  }

  const toggleDiagnosesExpandDialog = () => {
    setShowDiagnosesExpandDialog(prevState => !prevState)
  }

  const toggleRequisitionDialog = () => {
    setShowRequisitionDialog(prevState => !prevState)
  }

  const toggleRequisitionExpandDialog = () => {
    setShowRequisitionExpandDialog(prevState => !prevState)
  }

  const mapPrimaryButtonHandlers = (value) => {
    if (value === 'Patient') {
      return togglePatientHistoryDialog;
    } else if (value === 'Admin Notes') {
      return toggleAdminHistoryDialog;
    } else if (value === 'Forms') {
      return toggleFormsExpandDialog;
    } else if (value === 'Billing') {
      return toggleNewTransactionDialog;
    } else if (value === 'Allergies') {
      return toggleAllergyDialog;
    } else if (value === 'Medical Notes') {
      return toggleMedicalNotesDialog;
    } else if (value === 'Messages') {
      return toggleMessageDialog;
    } else if (value === 'Medications') {
      return toggleMedicationDialog;
    } else if (value === 'Diagnoses') {
      return toggleDiagnosesDialog;
    } else if (value === 'Requisitions') {
      return toggleRequisitionDialog;
    }
  }

  const mapSecondaryButtonHandlers = (value) => {
    if (value === 'Patient') {
      return togglePatientInfoDialog;
    } else if (value === 'Admin Notes') {
      return toggleAdminHistoryDialog;
    } else if (value === 'Allergies') {
      return toggleAllergyExpandDialog;
    } else if (value === 'Messages') {
      return toggleMessageExpandDialog;
    } else if (value === 'Diagnoses') {
      return toggleDiagnosesExpandDialog;
    } else if (value === 'Medications') {
      return toggleMedicationExpandDialog;
    } else if (value === 'Requisitions') {
      return toggleRequisitionExpandDialog;
    }
  }

  const mapIconHandlers = (value) => {
    if (value === 'Patient') {
      return togglePatientInfoDialog;
    } else if (value === 'Billing') {
      return togglePaymentDialog;
    }
  }

  const onFilePickerClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const handleDocumentsFile = (e) => {
    const { files } = e.target;
    console.log("files", files)
  }

  return (
    <>
      <input
        type='file'
        id='file'
        accept=".pdf, .json"
        multiple
        ref={inputFile}
        className={classes.noDisplay}
        onChange={e => handleDocumentsFile(e)}
      />
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
      <Dialog
        open={showAllergyDialog}
        title={" "}
        message={<Allergies onClose={toggleAllergyDialog} />}
        applyForm={() => toggleAllergyDialog()}
        cancelForm={() => toggleAllergyDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showAllergyExpandDialog}
        title={" "}
        message={<Allergies onClose={toggleAllergyExpandDialog} />}
        applyForm={() => toggleAllergyExpandDialog()}
        cancelForm={() => toggleAllergyExpandDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showMedicalNotesDialog}
        title={" "}
        message={<MedicalNotes onClose={toggleMedicalNotesDialog} />}
        applyForm={() => toggleMedicalNotesDialog()}
        cancelForm={() => toggleMedicalNotesDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showMessageDialog}
        title={"New Message"}
        message={<NewMessageForm onClose={toggleMessageDialog} />}
        applyForm={() => toggleMessageDialog()}
        cancelForm={() => toggleMessageDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showMessageExpandDialog}
        title={"Admin Notes History"}
        message={<h3>showMessageExpandDialog</h3>}
        applyForm={() => toggleMessageExpandDialog()}
        cancelForm={() => toggleMessageExpandDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showDiagnosesDialog}
        title={" "}
        message={<DiagnosesForm onClose={toggleDiagnosesDialog} />}
        applyForm={() => toggleDiagnosesDialog()}
        cancelForm={() => toggleDiagnosesDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showDiagnosesExpandDialog}
        title={" "}
        message={<DiagnosesForm onClose={toggleDiagnosesExpandDialog} />}
        applyForm={() => toggleDiagnosesExpandDialog()}
        cancelForm={() => toggleDiagnosesExpandDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showMedicationDialog}
        title={" "}
        message={<MedicationsForm onClose={toggleMedicationDialog} />}
        applyForm={() => toggleMedicationDialog()}
        cancelForm={() => toggleMedicationDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showMedicationExpandDialog}
        title={" "}
        message={<MedicationsForm onClose={toggleMedicationExpandDialog} />}
        applyForm={() => toggleMedicationExpandDialog()}
        cancelForm={() => toggleMedicationExpandDialog()}
        hideActions={true}
        size={"md"}
      />
      <Dialog
        open={showRequisitionDialog}
        title={" "}
        message={<RequisitionsForm onClose={toggleRequisitionDialog} />}
        applyForm={() => toggleRequisitionDialog()}
        cancelForm={() => toggleRequisitionDialog()}
        hideActions={true}
        size={"xl"}
      />
      <Dialog
        open={showRequisitionExpandDialog}
        title={" "}
        message={<RequisitionsForm onClose={toggleRequisitionExpandDialog} />}
        applyForm={() => toggleRequisitionExpandDialog()}
        cancelForm={() => toggleRequisitionExpandDialog()}
        hideActions={true}
        size={"lg"}
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
                primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                secondaryButtonHandler={mapSecondaryButtonHandlers(item.title)}
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
                primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                secondaryButtonHandler={mapSecondaryButtonHandlers(item.title)}
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
            primaryButtonHandler={onFilePickerClick}
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
  noDisplay: {
    display: 'none',
  }
}))
