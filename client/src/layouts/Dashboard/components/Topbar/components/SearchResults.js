import React from "react";
import Card from "@material-ui/core/Card";
import { Link as RouterLink } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    position: "absolute",
    top: "48px",
    background: "#f7f7f7",
    zIndex: 9999,
    minWidth: 350,
    right: 0,
  },
  CardContent: {
    padding: 0,
    backgroundColor: theme.palette.white,
    textAlign: "center",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    cursor: "pointer",
  },
}));

const SearchResults = ({ open, results, noContent }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.CardContent}>
        <p
          style={{
            paddingTop: "20px",
          }}
        >
          {noContent}
        </p>
        <List className={classes.list}>
          {results &&
            results.map((result) => (
              <>
                <ListItem component={RouterLink} to={`/patient/${result.id}`} button key={result.id} className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`${result.firstname} ${result.lastname}`}
                      className={classes.avatar}
                      component={RouterLink}
                      src={(result && result.avatar) || ""}
                      to="/"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${result.firstname} ${result.lastname}`}
                  />
                </ListItem>
                <Divider component="li" />
              </>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default SearchResults;
