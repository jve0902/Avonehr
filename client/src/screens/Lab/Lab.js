import React, { useState, useEffect, useCallback } from "react";

import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useSnackbar } from "notistack";
import FileViewer from "react-file-viewer";
import { pdfjs, Document, Page } from "react-pdf";
import {
  useParams, useLocation, useHistory, Link,
} from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";
import LabService from "../../services/lab.service";
import { DocumentOptions } from "../../static/lab";
import * as API from "../../utils/API";
import {
  checkFileExtension, labStatusTypeToLabel, labSourceTypeToLabel, dateTimeFormat,
} from "../../utils/helpers";
import Interpretation from "./components/Interpretation";
import LabHistory from "./components/LabHistory";
import LabValues from "./components/LabValues";
import MessageToPatient from "./components/MessageToPatient";
import UserHistory from "./components/UserHistory";

pdfjs
  .GlobalWorkerOptions
  .workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  topControls: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  borderSection: {
    border: "1px solid #aaa",
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    minHeight: 270,
    position: "relative",
  },
  text14: {
    fontSize: 14,
  },
  label: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  mb1: {
    marginBottom: theme.spacing(1),
  },
  buttonsRow: {
    margin: theme.spacing(1, 0),

    "& button": {
      marginRight: theme.spacing(1),
    },
  },
  paginationWrap: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: theme.spacing(1),
    marginTop: theme.spacing(4),
    width: `calc(100% - ${theme.spacing(3)}px)`, // 1.5 x 2 sides = 3
  },
  downloadButton: {
    "& a": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  },
  relativePosition: {
    position: "relative",
  },
  resultsContainer: {
    position: "absolute",
    zIndex: 2,
    width: "calc(100% - 8px)",
    background: theme.palette.common.white,
    maxHeight: 150,
    overflow: "scroll",
  },
  centerContainer: {
    height: "100%",
  },
}));

const Lab = () => {
  const { state } = useLocation();
  const { fromHome, documentId } = state;
  const history = useHistory();
  const { userId } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // states
  const [labData, setLabData] = useState(null);
  const [patientText, setPatientText] = useState("");
  const [patientId, setPatientId] = useState(null);
  const [patientSearchResults, setPatientSearchResults] = useState(null);
  const [docType, setDocType] = useState("");
  const [assigneeUsers, setAssigneeUsers] = useState([]);
  const [docNote, setDocNote] = useState("");
  const [docAssignTo, setDocAssignTo] = useState("");
  const [assignmentNote, setAssignmentNote] = useState("");
  const [showUserHistory, setShowUserHistory] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showGoBack, setShowGoBack] = useState(false);

  // pdf doc
  const [file, setFile] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [type, setType] = useState("");

  const updateFields = (lab) => {
    setPatientId(lab.client_id);
    setPatientText(lab.patient_name);
    setDocType(lab.type || "U");
    setDocNote(lab.note);
    setAssignmentNote(lab.note_assign);
    setDocAssignTo(lab.assigned_to);
  };

  const fetchLabDataByID = useCallback(() => {
    LabService.getLabById(documentId).then((res) => {
      const lab = res.data && res.data.length ? res.data[0] : {};
      setLabData(lab);
      updateFields(lab);
    });
  }, [documentId]);

  const fetchLabData = useCallback(() => {
    LabService.getLabData().then((res) => {
      const lab = res.data && res.data.length ? res.data[0] : null;
      if (lab) {
        setLabData(lab);
        updateFields(lab);
      } else {
        setShowGoBack(true);
      }
    });
  }, []);

  const fetchAssigneeUsers = useCallback(() => {
    LabService.getAssigneeUsers()
      .then((res) => {
        setAssigneeUsers(res.data);
      })
      .catch(() => {
        setAssigneeUsers([]);
      });
  }, []);

  const getLabInformation = useCallback(() => {
    if (fromHome) {
      fetchLabData();
    } else {
      fetchLabDataByID();
    }
  }, [fromHome, fetchLabData, fetchLabDataByID]);

  useEffect(() => {
    getLabInformation();
    fetchAssigneeUsers();
  }, [getLabInformation, fetchAssigneeUsers]);

  useEffect(() => {
    if (labData) {
      const filePath = `${process.env.REACT_APP_API_URL}static/patient/pid${userId}_${labData.filename}`;
      setFile(filePath);
      const fileType = checkFileExtension(filePath);
      setType(fileType);
    }
  }, [labData, userId]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    setPageNumber(1);
  };

  const onError = (e) => {
    enqueueSnackbar(e, { variant: "error" });
    console.error("onError", e);
  };

  const handleChange = (event, value) => {
    setPageNumber(value);
  };

  const toggleUserHistoryDialog = () => {
    setShowUserHistory((prevState) => !prevState);
  };

  const debouncedSearchTerm = useDebounce(patientText, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      if (debouncedSearchTerm.length > 2) {
        API.search(debouncedSearchTerm).then((res) => {
          setPatientSearchResults(res.data);
        });
      }
    }
  }, [debouncedSearchTerm]);

  const handlePatientChange = (patient) => {
    setPatientText(`${patient.firstname} ${patient.lastname}`);
    setPatientId(patient.id);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const labId = labData.id;
    const reqBody = {
      data: {
        type: docType,
        note: docNote,
        note_assign: assignmentNote,
        user_id: docAssignTo,
        patient_id: patientId,
      },
    };
    LabService.updateLab(labId, reqBody).then((res) => {
      enqueueSnackbar(res.message, { variant: "success" });
      getLabInformation();
    });
  };

  const updateStatus = (status) => {
    const labId = labData.id;
    const reqBody = {
      data: {
        labStatus: status,
      },
    };
    LabService.updateLabStatus(labId, reqBody).then((res) => {
      enqueueSnackbar(res.message, { variant: "success" });
      window.location.reload();
    });
  };

  const toggleMessageDialog = () => {
    setShowMessageDialog((prevState) => !prevState);
  };

  return (
    showGoBack
      ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.centerContainer}
        >
          <Typography variant="h3" gutterBottom>No Lab Requests Available</Typography>
          <Button
            variant="outlined"
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
        </Grid>
      )
      : (
        <>
          {!!showUserHistory && (
            <UserHistory
              open={showUserHistory}
              onClose={toggleUserHistoryDialog}
            />
          )}
          {!!showMessageDialog && (
            <MessageToPatient
              isOpen={showMessageDialog}
              onClose={toggleMessageDialog}
            />
          )}
          <Box mt={2}>
            <Grid
              item
              lg={6}
              xs={12}
              className={classes.topControls}
            >
              <Grid
                container
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="h4">Lab</Typography>
                <Button variant="text" onClick={() => toggleUserHistoryDialog()}>
                  User History
                </Button>
                <Button
                  variant="text"
                  className={classes.downloadButton}
                >
                  <Link
                    download
                    to={file}
                    target="_blank"
                  >
                    Download
                  </Link>
                  {/* <a
                download
                href={file}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a> */}
                  {/* Download */}
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                lg={6}
                xs={12}
              >
                <Grid
                  className={classes.borderSection}
                >
                  {type && (type === "pdf")
                    ? (
                      <>
                        <Document
                          file={(file)}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page pageNumber={pageNumber} />
                        </Document>
                        <Grid className={classes.paginationWrap}>
                          <Pagination count={totalPages} shape="rounded" onChange={handleChange} />
                        </Grid>
                      </>
                    )
                    : (
                      <FileViewer
                        fileType={type}
                        filePath={file}
                        onError={onError}
                      />
                    )}
                </Grid>
              </Grid>
              <Grid
                item
                lg={6}
                xs={12}
              >
                <Grid
                  className={classes.borderSection}
                >
                  <Grid container className={classes.mb1}>
                    <Grid
                      item
                      md={4}
                      className={classes.mb1}
                    >
                      <Typography
                        component="span"
                        className={`${classes.label}`}
                      >
                        Filename:
                      </Typography>
                      <Typography
                        component="span"
                        className={classes.text14}
                      >
                        {labData?.filename}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      md={4}
                    >
                      <Typography
                        component="span"
                        className={`${classes.label}`}
                      >
                        Created:
                      </Typography>
                      <Typography
                        component="span"
                        className={classes.text14}
                      >
                        {dateTimeFormat(labData?.created)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      md={4}
                    >
                      <Typography
                        component="span"
                        className={`${classes.label}`}
                      >
                        Status:
                      </Typography>
                      <Typography
                        component="span"
                        className={classes.text14}
                      >
                        {labStatusTypeToLabel(labData?.status)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      md={4}
                    >
                      <Typography
                        component="span"
                        className={`${classes.label}`}
                      >
                        Lab Date:
                      </Typography>
                      <Typography
                        component="span"
                        className={classes.text14}
                      >
                        {labData?.lab_dt}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      md={4}
                    >
                      <Typography
                        component="span"
                        className={`${classes.label}`}
                      >
                        Source:
                      </Typography>
                      <Typography
                        component="span"
                        className={classes.text14}
                      >
                        {labSourceTypeToLabel(labData?.source)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      md={4}
                    >
                      <Typography
                        component="span"
                        className={`${classes.label}`}
                      >
                        Lab Company:
                      </Typography>
                      <Typography
                        component="span"
                        className={classes.text14}
                      >
                        {labData?.lab_company}
                      </Typography>
                    </Grid>

                  </Grid>
                  <form onSubmit={onFormSubmit}>
                    <Grid container spacing={1}>
                      <Grid
                        item
                        sm={6}
                        xs={12}
                        className={classes.relativePosition}
                      >
                        <TextField
                          required
                          variant="outlined"
                          label="Patient"
                          margin="dense"
                          fullWidth
                          value={patientText}
                          onChange={(e) => setPatientText(e.target.value)}
                        />
                        {
                          (!!patientSearchResults && patientSearchResults.length) ? (
                            <Paper className={classes.resultsContainer}>
                              <List>
                                {patientSearchResults.map((patient) => (
                                  <ListItem
                                    button
                                    onClick={() => handlePatientChange(patient)}
                                    key={patient.id}
                                  >
                                    <ListItemText primary={`${patient.firstname} ${patient.lastname}`} />
                                  </ListItem>
                                ))}
                              </List>
                            </Paper>
                          )
                            : null
                        }
                      </Grid>

                      <Grid
                        item
                        sm={6}
                        xs={12}
                      >
                        <TextField
                          select
                          required
                          variant="outlined"
                          label="Document Type"
                          margin="dense"
                          fullWidth
                          value={docType}
                          onChange={(e) => setDocType(e.target.value)}
                        >
                          {DocumentOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <TextField
                      required
                      variant="outlined"
                      label="Document Note"
                      margin="dense"
                      fullWidth
                      value={docNote}
                      onChange={(e) => setDocNote(e.target.value)}
                    />

                    {!!fromHome && (
                      <Grid
                        container
                        className={classes.buttonsRow}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => toggleMessageDialog()}
                        >
                          Send Message to Patient
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => updateStatus("A")}
                        >
                          Approve and Next
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => updateStatus("D")}
                        >
                          Reject and Next
                        </Button>
                      </Grid>
                    )}

                    <Box mt={fromHome ? 1 : 0} mb={1}>
                      <Grid
                        item
                        lg={4}
                      >
                        <TextField
                          select
                          required
                          variant="outlined"
                          label="Assign To"
                          margin="dense"
                          fullWidth
                          value={docAssignTo}
                          onChange={(e) => setDocAssignTo(e.target.value)}
                        >
                          {assigneeUsers.length
                            ? assigneeUsers.map((option) => (
                              <MenuItem key={option.name} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                            : (
                              <MenuItem value="">
                                No Items Available
                              </MenuItem>
                            )}
                        </TextField>
                      </Grid>
                    </Box>

                    <TextField
                      variant="outlined"
                      name="notes"
                      label="Assignment Note"
                      type="text"
                      fullWidth
                      multiline
                      rows={5}
                      value={assignmentNote}
                      onChange={(e) => setAssignmentNote(e.target.value)}
                    />
                    <Button
                      variant="outlined"
                      className={classes.buttonsRow}
                      type="submit"
                    >
                      Save
                    </Button>
                  </form>
                </Grid>
                <Grid
                  className={classes.borderSection}
                >
                  <Typography gutterBottom variant="h5">Lab History</Typography>
                  {!!labData && (
                    <LabHistory labId={labData.id} />
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item lg={6} xs={12}>
                <Grid
                  className={classes.borderSection}
                >
                  <Typography gutterBottom variant="h5">Values</Typography>
                  {!!labData && (
                    <LabValues labId={labData.id} />
                  )}
                </Grid>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Grid
                  className={classes.borderSection}
                >
                  <Typography gutterBottom variant="h5">Value Interpretation</Typography>
                  <Interpretation />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      )
  );
};

export default Lab;
