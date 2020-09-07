import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from "../../../components/common/Card";
import Dialog from "../../../components/Dialog";
import { FirstColumnPatientCards, ThirdColumnPatientCards, FourthColumnPatientCards } from "../../../static/patient";

export default function Home() {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    setShowDialog(prevState => !prevState)
  }

  return (
    <>
    <Dialog
      open={showDialog}
      title={"Dialog"}
      message={"Dialog data goes here..."}
      applyForm={() => toggleDialog()}
      cancelForm={() => toggleDialog()}
      hideActions={true}
    />
    <Grid className={classes.main} container spacing={1}>
      <Grid item md={3} sm={6} xs={12}>
        {FirstColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              data={item.data}
              showActions={item.showActions}
              showSearch={item.showSearch}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
              primaryButtonHandler={toggleDialog}
              secondaryButtonHandler={toggleDialog}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Card
          title="Encounters"
          data={[]}
          showActions={true}
          primaryButtonText={"New"}
          secondaryButtonText={"Expand"}
          showSearch={false}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {ThirdColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              data={item.data}
              showActions={item.showActions}
              showSearch={item.showSearch}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {FourthColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              data={item.data}
              showActions={item.showActions}
              showSearch={item.showSearch}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
            />
          )
        })}
      </Grid>
    </Grid>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  main: {
      margin: theme.spacing(1, 0, 1, 0),
  },
}))
