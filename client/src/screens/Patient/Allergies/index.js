import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Allergies = (props) => {
    const classes = useStyles();
    const { onClose } = props;
    const [searchText, setSearchText] = useState('')

    const handleInputChnage = (e) => {
        const { value } = e.target;
        setSearchText(value);
      }

    return (
        <>
            <Grid className={classes.heading} container justify="space-between">
                <Typography variant="h3" color="textSecondary">Select Allergy</Typography>
                <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
            </Grid>
            <Grid item lg={4}>
                <TextField
                    label=""
                    placeholder="Search..."
                    name={'search'}
                    fullWidth
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => handleInputChnage(e)}
                />
            </Grid>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    inputRow: {
        margin: theme.spacing(3, 0),
    },
    heading: {
        marginBottom: theme.spacing(2)
    }
})
)


export default Allergies;
