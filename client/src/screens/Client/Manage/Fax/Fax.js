import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '40px 0px',
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  status: {
    display: 'flex',
    alignItems: 'center',
  },
  subject: {
    width: '50%',
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
  },
  texArea: {
    height: '250px !important',
    width: '75%',
    padding: '5px',
  },
  next: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: '100px',
  },
  historyTop: {
    marginTop: '15px',
  },
  history: {
    marginTop: '5px',
    display: 'flex',
    border: 'black solid 1px',
    padding: '5px',
    height: '300px',
    flexDirection: 'row',
    '& div': {
      width: '16%',
      margin: '5px',
    },
  },
  fileUpload: {
    display: 'flex',
    alignItems: 'center',
  },
  fileItems: {
    marginRight: '5px',
  },
}));

export default function Fax() {
  const classes = useStyles();
  const [faxNumber, setFaxNumber] = React.useState('');
  const [cover, setCover] = React.useState('');
  const [file, setFile] = React.useState(null);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Send Fax
      </Typography>

      <div className={classes.fields}>
        <TextField
          className={classes.subject}
          value={faxNumber}
          variant="outlined"
          margin="normal"
          id="faxNumber"
          label="Fax Number"
          name="faxNumber"
          autoComplete="faxNumber"
          autoFocus
          onChange={(event) => setFaxNumber(event.target.value)}
        />
        <Typography component="p" variant="body2" color="textPrimary">
          Cover Sheet
        </Typography>
        <TextareaAutosize
          className={classes.texArea}
          aria-label="minimum height"
          placeholder="Your message starts here..."
          onChange={(event) => setCover(event.target.value)}
        />
        <div className={classes.fileUpload}>
          <Button
            component="label"
            variant="contained"
            color="primary"
            className={`${classes.next} ${classes.fileItems}`}
            onChange={(event) => setFile(event.target.files[0].name)}
          >
            Add File
            <input type="file" style={{ display: 'none' }} />
          </Button>
          <Typography
            className={classes.fileItems}
            component="p"
            variant="body2"
            color="textPrimary"
          >
            {file}
          </Typography>
          {file && (
            <Button
              disabled={!file}
              color="secondary"
              className={classes.next}
              onClick={() => setFile(null)}
            >
              Remove
            </Button>
          )}
        </div>
        <Button
          disabled={!faxNumber || !cover}
          variant="contained"
          color="primary"
          className={classes.next}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
