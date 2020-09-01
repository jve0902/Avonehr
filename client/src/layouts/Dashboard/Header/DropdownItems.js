import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ClickAwayListener, Paper, Popper } from "@material-ui/core";
import { NavLink as RouterLink } from "react-router-dom";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px 10px",
  },
  subMenus: {
    zIndex: 2,
  },
  link: {
    color: theme.palette.secondary.main,
    display: "block",
    textDecoration: "none",
    padding: "5px 0",
  },
  nav: {
    width: "100%",
    minWidth: "190px",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",
    fontSize: "13px",
    marginTop: "10px",
  },
}));

// menuItems is an array of object like: {content: "", onClick: function}
export default function DropdownItems({ menuId, parentItem, menuItems }) {
  const classes = useStyles();
  // for maintaining open and close state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <div onClick={handleClick} onMouseOver={handleClick}>
        {parentItem}
      </div>
      <ArrowDropDownOutlinedIcon />
      <Popper
        className={classes.subMenus}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        role={undefined}
        transition
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <List component="nav" className={classes.nav}>
              {menuItems.map((item, i) => (
                <ListItem button divider key={i}>
                  <RouterLink
                    to={item.href}
                    className={classes.link}
                    key={item.title}
                  >
                    {item.title}
                  </RouterLink>
                </ListItem>
              ))}
            </List>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}

// by default we are generating a random id for the dropdown menu
DropdownItems.defaultProps = {
  menuId: `simpleMenu`,
};

// For additional type checking
DropdownItems.propTypes = {
  menuId: PropTypes.string,
  parentItem: PropTypes.string.isRequired,
  menuItems: PropTypes.array,
};
