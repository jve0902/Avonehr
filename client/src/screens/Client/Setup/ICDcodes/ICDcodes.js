import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, makeStyles } from "@material-ui/core";
import Video from "./../../../../components/videos/Video";
import ICDcodestable from "./components/ICDcodestable";
import ICDcodesform from "./components/ICDcodesform";
import { AuthConsumer } from "../../../../providers/AuthProvider";
import icdcodesService from "../../../../services/icdcodes.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  card: {
    minHeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ICDcodes = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const payload = {
    searchTerm,
    favorite,
  };
  const searchIcdCodes = (e) => {
    e.preventDefault();
    icdcodesService.search(payload).then((res) => {
      // console.log(res.data.data);
      setSearchResult(res.data.data);
    });
  };

  const textChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };
  const checkBoxChangeHandler = (e) => {
    setFavorite(e.target.checked);
  };

  return (
    <AuthConsumer>
      {({ user }) => (
        <div className={classes.root}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            ICD Codes
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used to manage ICD codes.
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <ICDcodesform
                searchIcdCodes={searchIcdCodes}
                textChangeHandler={textChangeHandler}
                checkBoxChangeHandler={checkBoxChangeHandler}
                searchTerm={searchTerm}
              />
              {searchResult.length > 0 && (
                <ICDcodestable user={user} result={searchResult} />
              )}
            </Grid>
            <Grid item md={12} xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    <Video url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </AuthConsumer>
  );
};

export default ICDcodes;
