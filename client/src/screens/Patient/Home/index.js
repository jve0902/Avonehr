import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

//common components
import Card from "../../../components/common/Card";
import Dialog from "../../../components/Dialog";
import { FirstColumnPatientCards, ThirdColumnPatientCards, FourthColumnPatientCards } from "../../../static/patient";

// dialog components
import BasicInfo from "../BasicInfo";
import AdminNotes from "../AdminNotes";
import Form from "../Form";
import NewTransactionForm from "../Billing/NewTransaction";
import PaymentForm from "../Billing/PaymentForm";
import Allergies from "../Allergies";
import MedicalNotes from "../MedicalNotes";
import NewMessageForm from "../Messages/NewMessage";
import DiagnosesForm from "../Diagnoses";
import MedicationsForm from "../Medications";
import RequisitionsForm from "../Requisitions";

//card content components
import PatientCardContent from "../BasicInfo/content";
import AdminNotesCardContent from "../AdminNotes/content";
import FormCardContent from "../Form/content";
import BillingCardContent from "../Billing/content";
import AllergiesCardContent from "../Allergies/content";
import DocumentsCardContent from "../Documents/content";
import EncountersCardContent from "../Encounters/content";
import MedicalNotesCardContent from "../MedicalNotes/content";
import MessagesCardContent from "../Messages/content";
import DiagnosesCardContent from "../Diagnoses/content";
import MedicationsCardContent from "../Medications/content";
import RequisitionsCardContent from "../Requisitions/content";
import TestsCardContent from "../Tests/content";

//expand detail components
import MedicalNotesDetails from "../MedicalNotes/details";

//service
import PatientService from "../../../services/patient.service";
import { setError, setSuccess } from '../../../store/common/actions';
import { useDispatch } from "react-redux";

export default function Home() {
  const classes = useStyles();
  const inputFile = useRef(null);
  const dispatch = useDispatch();

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
  const [patientData, setPatientData] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [patients, setPatients] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [billings, setBillings] = useState([]);
  const [forms, setForms] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [medicalNotes, setMedicalNotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [medications, setMedications] = useState([]);
  const [requisitions, setRequisitions] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchPatientData();
    fetchPatientHistory();
    fetchAllergies();
    fetchForms();
    fetchBillings();
    fetchDocuments();
    fetchEncounters();
    fetchMedicalNotes();
    fetchMessages();
    fetchDiagnoses();
    fetchMedications();
    fetchRequisitions();
    fetchTests();
  }, []);

  const fetchPatientData = () => {
    PatientService.getPatientData()
    .then((res) => {
      setPatientData(res.data);
    })
  };

  const fetchPatientHistory = () => {
    PatientService.getPatientHistory()
    .then((res) => {
      setPatientHistory(res.data);
    })
  };

  const fetchAllergies = () => {
    PatientService.getAllergies()
    .then((res) => {
      setAllergies(res.data);
    })
  };

  const fetchForms = () => {
    PatientService.getForms()
    .then((res) => {
      setForms(res.data);
    })
  };

  const fetchBillings = () => {
    PatientService.getBillings()
    .then((res) => {
      setBillings(res.data);
    })
  };

  const fetchDocuments = () => {
    PatientService.getDocuments()
    .then((res) => {
      setDocuments(res.data);
    })
  };

  const fetchEncounters = () => {
    PatientService.getEncounters()
    .then((res) => {
      setEncounters(res.data);
    })
  };

  const fetchMedicalNotes = () => {
    PatientService.getMedicalNotes()
    .then((res) => {
      setMedicalNotes(res.data);
    })
  };

  const fetchMessages = () => {
    PatientService.getMessages()
    .then((res) => {
      setMessages(res.data);
    })
  };

  const fetchDiagnoses = () => {
    PatientService.getDiagnoses()
    .then((res) => {
      setDiagnoses(res.data);
    })
  };

  const fetchMedications = () => {
    PatientService.getMedications()
    .then((res) => {
      setMedications(res.data);
    })
  };

  const fetchRequisitions = () => {
    PatientService.getRequisitions()
    .then((res) => {
      setRequisitions(res.data);
    })
  };

  const fetchTests = () => {
    PatientService.getTests()
    .then((res) => {
      setTests(res.data);
    })
  };

  const searchPatientHandler = (searchText) => {
    const reqBody = {
      "data": {
          "text": searchText
      } 
    }
    PatientService.searchPatient(reqBody)
    .then((res) => {
      setPatients(res.data);
    })
  };
  
  const debouncedSearchPatients = _.debounce(query => {
    searchPatientHandler(query);
  }, 1000);

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

  const mapCardContentDataHandlers = (value) => {
    if (value === 'Patient') {
      return !!patientData && <PatientCardContent data={patientData} />;
    } else if (value === 'Admin Notes') {
      return !!patientHistory && <AdminNotesCardContent data={patientHistory} />;
    } else if (value === 'Forms') {
      return !!forms && <FormCardContent data={forms} />;
    } else if (value === 'Billing') {
      return !!billings && <BillingCardContent data={billings} />;
    } else if (value === 'Allergies') {
      return !!allergies && <AllergiesCardContent data={allergies} reloadData={() => fetchAllergies()} />;
    } else if (value === 'Medical Notes') {
      return !!medicalNotes && <MedicalNotesCardContent data={medicalNotes} />;
    } else if (value === 'Messages') {
      return !!messages && <MessagesCardContent data={messages} reloadData={() => fetchMessages()} />;
    } else if (value === 'Medications') {
      return !!medications && <MedicationsCardContent data={medications} />;
    } else if (value === 'Diagnoses') {
      return !!diagnoses && <DiagnosesCardContent data={diagnoses} />;
    } else if (value === 'Requisitions') {
      return !!requisitions && <RequisitionsCardContent data={requisitions} />;
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

  const createDocument = (filename) => {
    const reqBody = {
      "data": {
          "patient_id": 1,
          "filename": filename,
      }
    }
    PatientService.createDocuments(reqBody)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        fetchDocuments();
      })
      .catch((error) => {
        const resMessage = (error.response && error.response.data &&
          error.response.data.message) || error.message || error.toString();
        let severity = "error";
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
      })
  }

  const handleDocumentsFile = (e) => {
    const { files } = e.target;
    console.log("files", files)
    createDocument(files[0].name);
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
        message={<AdminNotes onClose={toggleAdminHistoryDialog} />}
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
        message={<MedicalNotesDetails data={medicalNotes} />}
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
                data={mapCardContentDataHandlers(item.title)}
                showActions={item.showActions}
                showSearch={item.showSearch}
                icon={item.icon}
                primaryButtonText={item.primaryButtonText}
                secondaryButtonText={item.secondaryButtonText}
                primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                secondaryButtonHandler={mapSecondaryButtonHandlers(item.title)}
                iconHandler={mapIconHandlers(item.title)}
                searchHandler={value => {
                  debouncedSearchPatients(value)
                }}
              />
            )
          })}
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Card
            title="Encounters"
            data={!!encounters && <EncountersCardContent data={encounters} />}
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
                data={mapCardContentDataHandlers(item.title)}
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
                data={mapCardContentDataHandlers(item.title)}
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
            data={!!documents && <DocumentsCardContent data={documents} reloadData={() => fetchDocuments()} />}
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
            data={!!tests && <TestsCardContent data={tests} />}
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
