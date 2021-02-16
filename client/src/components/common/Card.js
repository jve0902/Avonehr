import React, { useState } from "react";

import {
  Card,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/CheckCircle";
import CardIcon from "@material-ui/icons/CreditCard";
import DesktopIcon from "@material-ui/icons/DesktopMac";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SaveLayoutIcon from "@material-ui/icons/Save";
import clsx from "clsx";
import PropTypes from "prop-types";

import useDidMountEffect from "../../hooks/useDidMountEffect";
import Colors from "../../theme/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "auto",
    background: Colors.white,
    border: "1px solid rgba(38, 38, 38, 0.12)",
    borderRadius: 4,
    marginBottom: 6,
  },
  minHeightCard: {
    minHeight: 100,
  },
  titleContainer: {
    borderBottom: `1px solid ${Colors.border}`,
    minHeight: 34,
    cursor: "move",
    position: "sticky",
    top: 0,
    background: theme.palette.common.white,
  },
  fullPadding: {
    padding: 8,
  },
  leftPadding: {
    padding: "0 0 0 8px",
  },
  title: {
    fontWeight: "600",
    fontSize: 13,
  },
  cardInfo: {
    fontSize: 13,
  },
  button: {
    fontSize: 13,
    lineHeight: "14px",
  },
  cardContent: {
    padding: 8,
  },
  sideIcon: {
    minWidth: 35,
  },
  profileContainer: {
    padding: theme.spacing(1, 2),
    cursor: "pointer",
  },
  avatar: {
    marginRight: 15,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  text: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "1rem",
    lineHeight: "1.3rem",
    color: Colors.black,
  },
  searchInput: {
    margin: "2px 0",
    maxWidth: "110px",
  },
  icon: {
    cursor: "pointer",
  },
  textField: {
    height: 8,
  },
}));

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
    updateLayoutHandler,
    resetLayoutHandler,
    isLayoutUpdated,
    contentToggleHandler,
    hasMinHeight,
  } = props;

  const [contentTogglerState, setContentTogglerState] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetLayoutAndClose = () => {
    setAnchorEl(null);
    resetLayoutHandler();
  };

  const menuIcons = { DesktopIcon, CardIcon, AddIcon };

  useDidMountEffect(() => {
    // This will only be called when 'contentTogglerState' changes, not on initial render
    contentToggleHandler(contentTogglerState);
  }, [contentTogglerState]);

  return (
    <>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleClose}
      >
        <MenuItem disabled={!isLayoutUpdated} onClick={resetLayoutAndClose}>
          Reset Layout
        </MenuItem>
      </Menu>
      <Card
        className={clsx({
          [classes.root]: true, // always apply
          [classes.minHeightCard]: hasMinHeight, // only when hasMinHeight === true
        })}
        variant="outlined"
      >
        {/* drag-handle className is important for the header as it makes the header draggable only */}
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={`drag-handle ${classes.titleContainer} ${
            showActions ? classes.leftPadding : classes.fullPadding
          }`}
        >
          <Typography className={classes.title}>
            {title}
            {" "}
&nbsp; &nbsp;
          </Typography>
          {title === "Patient" && (
            <>
              <MoreVertIcon className={classes.icon} onClick={handleClick} />
              <SaveLayoutIcon
                className={classes.icon}
                onClick={() => updateLayoutHandler()}
              />
            </>
          )}
          {!!icon
            && React.createElement(menuIcons[icon], {
              onClick: iconHandler,
              className: classes.icon,
            })}
          {title === "Diagnoses" && (
            <Button
              variant="text"
              disableRipple
              className={classes.button}
              onClick={() => {
                setContentTogglerState((prevState) => !prevState);
              }}
            >
              Show
              {" "}
              {contentTogglerState ? "Inactive" : "Active"}
            </Button>
          )}
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
                classes: { input: classes.textField },
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
        <Grid className={classes.cardContent}>{data || ""}</Grid>
      </Card>
    </>
  );
};

PatientCard.defaultProps = {
  title: "Title",
  showActions: false,
  showEditorActions: false,
  showSearch: false,
  primaryButtonText: "History",
  secondaryButtonText: "Edit",
  icon: null,
  cardInfo: null,
  primaryButtonHandler: () => { },
  secondaryButtonHandler: () => { },
  iconHandler: () => { },
  searchHandler: () => { },
  editorSaveHandler: () => { },
  editorCancelHandler: () => { },
  updateLayoutHandler: () => { },
  resetLayoutHandler: () => { },
  isLayoutUpdated: false,
  contentToggleHandler: () => { },
  hasMinHeight: false,
};

PatientCard.propTypes = {
  title: PropTypes.string,
  showActions: PropTypes.bool,
  showEditorActions: PropTypes.bool,
  showSearch: PropTypes.bool,
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
  updateLayoutHandler: PropTypes.func,
  resetLayoutHandler: PropTypes.func,
  isLayoutUpdated: PropTypes.bool,
  contentToggleHandler: PropTypes.func,
  hasMinHeight: PropTypes.bool,
};

// export default rglDynamicHeight(PatientCard);
export default PatientCard;
