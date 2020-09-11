import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TransactionFormFields } from "../../../../static/transactionForm";

const Form = (props) => {
    const classes = useStyles();
    const { onClose } = props;

    const [formFields, setFormFields] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        type: '',
        paymentType: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zipPostal: '',
    })

    const handleInputChnage = (e) => {
        const { value, name } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    return (
        <>
            <Grid container justify="space-between">
                <Typography variant="h3" color="textSecondary">New Transaction</Typography>
                <Button variant="outlined" onClick={() => onClose()}>Close</Button>
            </Grid>
            <form>
                <Grid className={classes.inputRow}>
                    {
                        TransactionFormFields.map((item, index) => (
                            <Grid key={index} container alignItems="center" className={classes.formInput}>
                                <Grid item lg={2}>
                                    <label variant="h4" color="textSecondary">{item.label}</label>
                                </Grid>
                                <Grid item md={4}>
                                    {
                                        item.baseType === "input"
                                            ?
                                            <TextField
                                                variant={"standard"}
                                                name={item.name}
                                                id={item.id}
                                                type={item.type}
                                                fullWidth
                                                onChange={(e) => handleInputChnage(e)}
                                            />
                                            :
                                            <TextField
                                                select
                                                placeholder={item.label}
                                                id={item.id}
                                                name={item.name}
                                                value={formFields[item.name]}
                                                fullWidth
                                                onChange={(e) => handleInputChnage(e)}
                                            >
                                                {
                                                    item.options.map((option, index) => {
                                                        return (
                                                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </TextField>
                                    }
                                </Grid>
                            </Grid>
                        ))
                    }
                    <Grid item lg={2}>
                        <Typography gutterBottom variant="body1" color="textPrimary" gutterBottom>Notes</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            variant="outlined"
                            name={"notes"}
                            id={"notes"}
                            type={"text"}
                            fullWidth
                            onChange={(e) => handleInputChnage(e)}
                            multiline={true}
                            rows={5}
                        />
                    </Grid>
                </Grid>
                
                <Grid container justify="space-between">
                    <Button variant="outlined" onClick={() => onClose()}>Save</Button>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                </Grid>
            </form>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    inputRow: {
        margin: theme.spacing(3, 0),
    },
    formInput: {
        marginBottom: theme.spacing(1)
    }
})
)


export default Form;
