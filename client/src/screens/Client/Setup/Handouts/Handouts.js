import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useSnackbar } from "notistack";

import Video from "../../../../components/videos/Video";
import HandoutService from "../../../../services/setup/handouts.service";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  table: {
    minWidth: 650,
  },
  titleButtonWrap: {
    display: "flex",
    marginBottom: theme.spacing(2),
    "& label": {
      marginLeft: theme.spacing(4),
    },
  },
  contentWrap: {
    display: "flex",
  },
  handoutTable: {
    marginTop: theme.spacing(4),
  },
  tableHead: {
    "& th": {
      fontWeight: 600,
    },
  },
}));

const Handouts = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [handouts, setHandouts] = useState([]);

  const fetchHandouts = () => {
    HandoutService.getHandouts().then((response) => {
      setHandouts(response.data.data);
    });
  };

  useEffect(() => {
    fetchHandouts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createHandout = (reqBody) => {
    HandoutService.createHandouts(reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        fetchHandouts();
      })
      .catch((error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();
        enqueueSnackbar(`${resMessage}`, { variant: "error" });
      });
  };

  const handleHandoutsFile = (e) => {
    const { files } = e.target;
    const fd = new FormData();
    fd.append("file", files[0]);
    createHandout(fd);
  };

  const handleDelete = (id) => {
    HandoutService.deleteHandout(id).then((response) => {
      fetchHandouts();
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
    });
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={8}>
        <Grid item md={6} xs={12}>
          <div className={classes.titleButtonWrap}>
            <Typography
              component="h1"
              variant="h2"
              color="textPrimary"
              className={classes.title}
            >
              Handouts
            </Typography>
            <Button
              variant="outlined"
              component="label"
            >
              Add
              <input
                type="file"
                id="file"
                accept=".pdf, .txt, .doc, .docx, image/*"
                hidden
                onChange={(e) => handleHandoutsFile(e)}
              />
            </Button>
          </div>
          <p>These are files we give to patients about specific topics.</p>
          <TableContainer component={Paper} className={classes.handoutTable}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>Filename</TableCell>
                  <TableCell align="right">Actions</TableCell>
                  <TableCell align="right">Created</TableCell>
                  <TableCell align="right">CreatedBy</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {handouts.map((handout) => (
                  <TableRow key={handout.filename}>
                    <TableCell component="th" scope="row">
                      {handout.filename}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleDelete(handout.id)}>Delete</Button>
                    </TableCell>
                    <TableCell align="right">{moment(handout.created).format("ll")}</TableCell>
                    <TableCell align="right">{handout.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={6} xs={12}>
          <Video url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Handouts;
