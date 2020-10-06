import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { CssBaseline, makeStyles } from "@material-ui/core";
import CPTform from "./component/CPTform";
import CPTtable from "./component/CPTtable";
import CPTCodesService from "../../../../services/cpt.service";
import { AuthConsumer } from "../../../../providers/AuthProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
}));

export default function CTPcodes() {
  const classes = useStyles();
  const [lebCompanyList, setLabCompanyList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [cptId, setCptId] = useState("");
  const [cptDescription, setCptDescription] = useState("");
  const [labCompanyId, setLabCompanyId] = useState("");
  const [favorite, setFavorite] = useState("");
  const [billable, setBillable] = useState("");
  const [self, setSelf] = useState("");
  const [group, setGroup] = useState("");
  const payload = {
    cptId,
    cptDescription,
    labCompanyId,
    favorite,
    billable,
    self,
    group,
  };

  const fetchLabCompanyList = () => {
    CPTCodesService.getLabCompnayList().then((res) => {
      setLabCompanyList(res.data);
    });
  };

  useEffect(() => {
    fetchLabCompanyList();
  }, []);

  const handleFormSubmition = (e) => {
    e.preventDefault();
    CPTCodesService.search(payload).then((res) => {
      setSearchResult(res.data.data);
    });
  };

  const handleChangeOfCptId = (e) => {
    setCptId(e.target.value);
  };
  const handleChangeOfCptDescription = (e) => {
    setCptDescription(e.target.value);
  };
  const handleChangeOfLabCompanyId = (e) => {
    setLabCompanyId(e.target.value);
  };
  const handleChangeOfFavorite = (e) => {
    setFavorite(e.target.checked);
  };
  const handleChangeOfBillable = (e) => {
    setBillable(e.target.checked);
  };
  const handleChangeOfSelf = (e) => {
    setSelf(e.target.checked);
  };
  const handleChangeOfGroup = (e) => {
    setGroup(e.target.checked);
  };

  return (
    <AuthConsumer>
      {({ user }) => (
        <React.Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <Typography
              component="h1"
              variant="h2"
              color="textPrimary"
              className={classes.title}
            >
              CPT Codes
            </Typography>
            <Typography component="p" variant="body2" color="textPrimary">
              This page is used to manage CTP codes
            </Typography>
            <CPTform
              lebCompanyList={lebCompanyList}
              handleFormSubmition={handleFormSubmition}
              handleChangeOfCptId={handleChangeOfCptId}
              handleChangeOfCptDescription={handleChangeOfCptDescription}
              handleChangeOfLabCompanyId={handleChangeOfLabCompanyId}
              handleChangeOfFavorite={handleChangeOfFavorite}
              handleChangeOfBillable={handleChangeOfBillable}
              handleChangeOfSelf={handleChangeOfSelf}
              handleChangeOfGroup={handleChangeOfGroup}
              labCompanyId={labCompanyId}
            />
            {searchResult.length > 0 && (
              <CPTtable
                searchResult={searchResult}
                user={user}
                handleFormSubmition={handleFormSubmition}
              />
            )}
          </div>
        </React.Fragment>
      )}
    </AuthConsumer>
  );
}
