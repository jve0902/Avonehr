import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from "../../../components/common/Card";
import Dialog from "../../../components/Dialog";
import { FirstColumnPatientCards, ThirdColumnPatientCards, FourthColumnPatientCards } from "../../../static/patient";
import BasicInfo from "../BasicInfo"

export default function Home() {
  const classes = useStyles();
  const [showPatientDialog, setShowPatientDialog] = useState(false);

  const toggleDialog = () => {
    setShowPatientDialog(prevState => !prevState)
  }

  return (
    <>
    <Dialog
      open={showPatientDialog}
      title={"Patient Info"}
      message={<BasicInfo />}
      applyForm={() => toggleDialog()}
      cancelForm={() => toggleDialog()}
      hideActions={true}
      size={"lg"}
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

    <Grid container spacing={1}>
      <Grid item md={6} xs={12}>
        <Card
          title="Documents"
          data={[]}
          showActions={true}
          primaryButtonText={"New"}
          secondaryButtonText={"Expand"}
          showSearch={false}
          primaryButtonHandler={toggleDialog}
          secondaryButtonHandler={toggleDialog}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Card
          title="All Tests"
          data={[]}
          showActions={true}
          primaryButtonText={"Expand"}
          secondaryButtonText={null}
          showSearch={false}
          primaryButtonHandler={toggleDialog}
        />
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
