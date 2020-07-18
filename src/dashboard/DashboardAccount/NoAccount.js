import React from "react";
import { AccountPage } from "../styledComponents/DashAccount";
import MonthlyButton from "../../Components/Paypal/MonthlyButton";
import BiAnnuallyButton from "../../Components/Paypal/BiannuallyButton";
import YearlyButton from "../../Components/Paypal/YearlyButton";
import UndrawOptionsSVG from "../Images/undrawOptionsSVG";
import UndrawInvestmentSVG from "../Images/undrawInvestmentSVG";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken, getSubscription } from "../auth/Auth";
import EditAccount from "./EditAccount";
import Grid from "@material-ui/core/Grid";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DoneIcon from "@material-ui/icons/Done";
import Avatar from "@material-ui/core/Avatar";
import checkbox from "../../assets/images/checkbox.png";
import { createMuiTheme } from "@material-ui/core/styles";

// This components purpose is to potentially turn free users into paid users, capture the subscription ID, and push them to /data
// Making this component more responsive by implementing Material UI cards.

const useStyles = makeStyles({
  root: {
    minWidth: 340,
    minHeight: 500
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: "3rem",
    fontWeight: 400,
    letterSpacing: "1px"
  },
  subtitle1: {
    fontSize: "2.2rem",
    fontWeight: 600
  },
  pos: {
    marginTop: "4rem",
    marginBottom: 12,
    fontSize: "2.2rem",
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.54)"
  },
  listed: {
    fontSize: "2.2rem",
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.54)"
  },
  ul: {
    listStyle: "url(checkbox)"
  }
});

const NoAccount = props => {
  const classes = useStyles();

  const history = useHistory();

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    history.push("/data");
  };

  const signUp = async (e, input) => {
    e.preventDefault();
    history.push("/signup");
  };

  const GET_SUBSCRIPTION_ID = gql`
    query($userEmail: String!) {
      databankUser(input: { email: $userEmail }) {
        id
        email
        subscription_id
        p_next_billing_time
        paypal_plan
      }
    }
  `;

  return (
    <AccountPage>
      <div className="page-row">
        <div className="page-row-col-top">
          <div className="header-container">
            <div className="header-row">
              <div className="header-row-col">
                <UndrawOptionsSVG />
              </div>
              <div className="account-page-header">
                <h1>Need more data?</h1>
                <div className="account-descript">
                  <p>
                    We know how important data filtering is to your research.
                  </p>
                  <p>Upgrade to our paid plan to access all material.</p>
                </div>
              </div>

              <div className="header-row-col">
                <UndrawInvestmentSVG />
              </div>
            </div>
          </div>
        </div>
        <div className="page-row-col-bottom">
          <div className="account-container">
            <div className="account-row">
              <div className="account-row-col">
                <div className="account-type">
                  <div className="card-shadow1">
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography
                          className={classes.subtitle1}
                          variant="h3"
                          component="h3"
                          gutterBottom
                        >
                          Free Account
                        </Typography>
                        <div className="free-border">
                          <Typography
                            className={classes.title}
                            variant="h1"
                            component="h3"
                          >
                            Free
                          </Typography>
                        </div>
                        <Grid container direction="column">
                          <List className={classes.listed}>
                            {[
                              `Data Series:  "Key Demographics"`,
                              "Bar Chart Display",
                              "One filter per category"
                            ].map(value => {
                              const labelId = `checkbox-list-label-${value}`;

                              return (
                                <Grid item xs={12} md={6}>
                                  <div className={classes.demo}>
                                    <ListItem>
                                      <ListItemIcon>
                                        <DoneIcon />
                                      </ListItemIcon>

                                      <ListItemText
                                        id={labelId}
                                        primary={` ${value}`}
                                        className={classes.listed}
                                        style={{ fontSize: "2.2rem" }}
                                      />
                                    </ListItem>
                                  </div>
                                </Grid>
                              );
                            })}
                          </List>
                          <ul>
                            <Grid
                              item
                              className={classes.pos}
                              style={{ marginTop: "5rem" }}
                            >
                              <li>Data Series access:</li>
                            </Grid>
                            <Grid
                              item
                              className={classes.pos}
                              style={{ marginTop: "2rem", paddingLeft: "7%" }}
                            >
                              "Key Demographics"
                            </Grid>
                            <Grid item className={classes.pos}>
                              <li>Bar Chart Display</li>
                            </Grid>
                            <Grid item className={classes.pos}>
                              <li>One filter per category</li>
                            </Grid>
                          </ul>
                        </Grid>
                      </CardContent>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          style={{
                            width: "50%",
                            height: "3.5rem",
                            margin: "5%",
                            background: "rgb(235, 94, 82)",
                            color: "white"
                          }}
                          type="submit"
                          onClick={signUp}
                        >
                          Create an Account
                        </button>
                        <button
                          style={{
                            width: "50%",
                            height: "3.5rem",
                            marginBottom: "10%",
                            background: "rgb(235, 94, 82)",
                            color: "white"
                          }}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Back to Data
                        </button>
                      </Grid>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="account-row-col">
                <div className="account-type">
                  <div className="card-shadow2">
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography
                          className={classes.subtitle1}
                          variant="h3"
                          component="h3"
                          gutterBottom
                        >
                          Premium Account
                        </Typography>
                        <div className="free-border">
                          <Typography
                            className={classes.title}
                            variant="h1"
                            component="h3"
                          >
                            $10/monthly
                          </Typography>
                        </div>
                        <div className="free-perk1">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Download data into an excel file
                          </Typography>
                        </div>
                        <div className="free-perk2">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Change Data Filters
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Cross-Filter Data by Date
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Additional Filtering Options
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <div className="account-bottom">
                          <MonthlyButton />
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="account-row-col">
                <div className="account-type">
                  <div className="card-shadow3">
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography
                          className={classes.subtitle1}
                          variant="h3"
                          component="h3"
                          gutterBottom
                        >
                          Premium Account
                        </Typography>
                        <div className="free-border">
                          <Typography
                            className={classes.title}
                            variant="h1"
                            component="h3"
                          >
                            $49.99/bi-annually
                          </Typography>
                        </div>
                        <div className="free-perk1">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Download data into an excel file
                          </Typography>
                        </div>
                        <div className="free-perk2">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Change Data Filters
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Cross-Filter Data by Date
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Additional Filtering Options
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <div className="account-bottom">
                          <BiAnnuallyButton />
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="account-row-col">
                <div className="account-type">
                  <div className="card-shadow4">
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography
                          className={classes.subtitle1}
                          variant="h3"
                          component="h3"
                          gutterBottom
                        >
                          Premium Account
                        </Typography>
                        <div className="free-border">
                          <Typography
                            className={classes.title}
                            variant="h1"
                            component="h3"
                          >
                            $89.99/yearly
                          </Typography>
                        </div>
                        <div className="free-perk1">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Download data into an excel file
                          </Typography>
                        </div>
                        <div className="free-perk2">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Change Data Filters
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Cross-Filter Data by Date
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Additional Filtering Options
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <div className="account-bottom">
                          <YearlyButton />
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountPage>
  );
};

export default NoAccount;
