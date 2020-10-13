import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton
} from "@material-ui/core";
import Colors from "../../theme/colors";

import CardIcon from "@material-ui/icons/CreditCard";
import DesktopIcon from "@material-ui/icons/DesktopMac";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveLayoutIcon from "@material-ui/icons/Save";

const PatientCard = (props) => {
  const classes = useStyles();
  const {
    data,
    title,
    showActions,
    showEditorActions,
    primaryButtonText,
    secondaryButtonText,
    icon,
    showSearch,
    primaryButtonHandler,
    secondaryButtonHandler,
    iconHandler,
    searchHandler,
    cardInfo,
    editorSaveHandler,
    editorCancelHandler,
    updateLayoutHandler
  } = props;

  const menuIcons = { DesktopIcon, CardIcon, AddIcon };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={`${classes.titleContainer} ${
            showActions ? classes.leftPadding : classes.fullPadding
          }`}
        >
          <Typography className={classes.title}>
            {title} &nbsp; &nbsp;
          </Typography>
          {title === "Patient" && (
            <SaveLayoutIcon
              className={classes.icon}
              onClick={() => updateLayoutHandler()}
            />
          )}
          {!!icon &&
            React.createElement(menuIcons[icon], {
              onClick: iconHandler,
              className: classes.icon
            })}
          {showEditorActions && (
            <Grid>
              <IconButton
                variant="outlined"
                onClick={editorCancelHandler}
                size="small"
              >
                <CancelIcon />
              </IconButton>
              <IconButton
                variant="outlined"
                type="submit"
                size="small"
                onClick={editorSaveHandler}
              >
                <SaveIcon />
              </IconButton>
            </Grid>
          )}
          {!!showSearch && (
            <TextField
              margin="dense"
              variant="outlined"
              placeholder="Search ..."
              className={classes.searchInput}
              InputProps={{
                classes: { input: classes.textField }
              }}
              onChange={(e) => {
                const searchedValue = e.target.value;
                if (!!searchedValue && searchedValue.length) {
                  searchHandler(searchedValue);
                }
              }}
            />
          )}
          {!!cardInfo && (
            <Typography className={classes.cardInfo}>{cardInfo}</Typography>
          )}
          {showActions && (
            <Grid>
              {!!primaryButtonText && (
                <Button
                  className={classes.button}
                  onClick={() => primaryButtonHandler()}
                >
                  {primaryButtonText}
                </Button>
              )}
              {!!secondaryButtonText && (
                <Button
                  className={classes.button}
                  onClick={() => secondaryButtonHandler()}
                >
                  {secondaryButtonText}
                </Button>
              )}
            </Grid>
          )}
        </Grid>
        <Grid className={classes.cardContent}>{!!data ? data : ""}</Grid>
      </Card>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 100,
    overflowY: "auto",
    background: Colors.white,
    border: "1px solid rgba(38, 38, 38, 0.12)",
    borderRadius: 4,
    marginBottom: 6
  },
  titleContainer: {
    borderBottom: `1px solid ${Colors.border}`,
    minHeight: 34
  },
  fullPadding: {
    padding: 8
  },
  leftPadding: {
    padding: "0 0 0 8px"
  },
  title: {
    fontWeight: "600",
    fontSize: 13
  },
  cardInfo: {
    fontSize: 13
  },
  button: {
    fontSize: 13,
    lineHeight: "14px"
  },
  cardContent: {
    padding: 8
  },
  sideIcon: {
    minWidth: 35
  },
  profileContainer: {
    padding: theme.spacing(1, 2),
    cursor: "pointer"
  },
  avatar: {
    marginRight: 15,
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  text: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "1rem",
    lineHeight: "1.3rem",
    color: Colors.black
  },
  searchInput: {
    margin: "2px 0",
    maxWidth: "110px"
  },
  icon: {
    cursor: "pointer"
  },
  textField: {
    height: 8
  }
}));

PatientCard.defaultProps = {
  title: "Title",
  showActions: false,
  showEditorActions: false,
  showSearch: false,
  data: <div />,
  primaryButtonText: "History",
  secondaryButtonText: "Edit",
  icon: null,
  cardInfo: null,
  primaryButtonHandler: () => {},
  secondaryButtonHandler: () => {},
  iconHandler: () => {},
  searchHandler: () => {},
  editorSaveHandler: () => {},
  editorCancelHandler: () => {},
  updateLayoutHandler: () => {}
};

PatientCard.propTypes = {
  title: PropTypes.string,
  showActions: PropTypes.bool.isRequired,
  showEditorActions: PropTypes.bool,
  showSearch: PropTypes.bool.isRequired,
  data: PropTypes.node.isRequired,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  icon: PropTypes.node,
  cardInfo: PropTypes.string,
  primaryButtonHandler: PropTypes.func,
  secondaryButtonHandler: PropTypes.func,
  iconHandler: PropTypes.func,
  searchHandler: PropTypes.func,
  editorSaveHandler: PropTypes.func,
  editorCancelHandler: PropTypes.func,
  updateLayoutHandler: PropTypes.func
};

// export default rglDynamicHeight(PatientCard);
export default PatientCard;
