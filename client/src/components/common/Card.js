import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, ListItem, ListItemIcon, ListItemText, Button, TextField } from '@material-ui/core';
import Colors from '../../theme/colors';
import CardIcon from '@material-ui/icons/CreditCard';
import DesktopIcon from '@material-ui/icons/Dvr';

const PatientCard = (props) => {
  const classes = useStyles();
  const { data, title, showActions, primaryButtonText, secondaryButtonText, icon, showSearch } = props;
  
  const menuIcons = { DesktopIcon, CardIcon };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <Grid container justify="space-between" alignItems="center" className={classes.titleContainer}>
          <Typography className={classes.title}>
            {title} &nbsp; &nbsp;
          </Typography>
          {
            !!icon && (
              React.createElement(menuIcons[icon])
            )
          }
          {
            !!showSearch && (
              <TextField
                margin='dense'
                variant='outlined'
                placeholder="Search ..."
                className={classes.searchInput}
              />
            )
          }
          {
            showActions && (
              <Grid>
                {!!primaryButtonText && (<Button>{primaryButtonText}</Button>)}
                {!!secondaryButtonText && (<Button>{secondaryButtonText}</Button>)}
              </Grid>
            )
          }
        </Grid>
        <Grid className={classes.cardContent}>
          {
            !!data ?
            data
            :
            "Data goes here.."
          }
        </Grid>
      </Card>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 150,
    background: Colors.white,
    border: '1px solid rgba(38, 38, 38, 0.12)',
    borderRadius: 4,
    marginBottom: 10
  },
  titleContainer: {
    padding: '0 0 0 1em',
    borderBottom: `1px solid ${Colors.border}`,
    minHeight: 47,
  },
  title: {
    fontWeight: '600',
    fontSize: '1em'
  },
  seeMoreLinks: {
    cursor: "pointer"
  },
  cardContent: {
    padding: theme.spacing(2),
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
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '1.3rem',
    color: Colors.black
  },
  searchInput: {
    margin: "4px 0",
    maxWidth: '100px'
  }
}))

PatientCard.defaultProps = {
  title: 'Title',
  showActions: false,
  showSearch: false,
  data: [],
  primaryButtonText: 'History',
  secondaryButtonText: 'Edit',
  icon: null,
};

PatientCard.propTypes = {
  title: PropTypes.string,
  showActions: PropTypes.bool.isRequired,
  showSearch: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  icon: PropTypes.node
};


export default PatientCard;
