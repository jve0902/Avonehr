import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, ListItem, ListItemText, Button } from '@material-ui/core';
import Colors from '../../theme/colors';

const PatientCard = (props) => {
    const classes = useStyles();
    const { items, title, showActions, primaryButtonText, secondaryButtonText} = props;

    return (
        <>
            <Card className={classes.root} variant="outlined">
                <Grid container justify="space-between" alignItems="center" className={classes.titleContainer}>
                    <Typography className={classes.title}>
                        {title}
                    </Typography>
                    {
                        showActions && (
                            <Grid>
                                <Button>{primaryButtonText}</Button>
                                <Button>{secondaryButtonText}</Button>
                            </Grid>
                        )
                    }
                </Grid>
                <Grid className={classes.cardContent}>
                    {
                        !!items && items.length && items.map((item, index) => {
                            return (
                                <ListItem key={index} button>
                                    {/* <ListItemIcon className={classes.sideIcon}>
                                            <img alt={`${item.icon}_icon`} src={require(`../../assets/icons/${item.icon}.png`)} />
                                        </ListItemIcon> */}
                                    <ListItemText
                                        classes={{ primary: classes.text }}
                                        primary={item.name}
                                    />
                                </ListItem>
                            )
                        })
                    }
                </Grid>
            </Card>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 100,
        background: Colors.white,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 4,
        marginBottom: 10
    },
    titleContainer: {
        padding: '0 0 0 1em',
        borderBottom: `1px solid ${Colors.border}`,
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
    }
}))

PatientCard.defaultProps = {
    title: 'Title',
    showActions: false,
    items: [],
    primaryButtonText: 'History',
    secondaryButtonText: 'Edit'
};

PatientCard.propTypes = {
    title: PropTypes.string,
    showActions: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    primaryButtonText: PropTypes.string,
    secondaryButtonText: PropTypes.string,
  };

function mapStateToProps(state) {
    return {
        // user: state.user,
    };
  }
  

export default connect(mapStateToProps)(PatientCard)