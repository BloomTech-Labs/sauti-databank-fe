import React from "react";
import { AccountPage } from "../styledComponents/DashAccount";

//Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Making this component more responsive by implementing Material UI cards

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
    marginBottom: 12,
    fontSize: "2.2rem",
    fontWeight: 600
  }
});
// This component shows user offerings for admins
const DashAccountAdmin = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <AccountPage>
      <div className="page-row">
        <div className="page-row-col-top">
          <div className="header-container">
            <div className="header-row">
              <div className="header-row-col-admin">
                <h1>User Account Types</h1>
                <p>Account types available to our customers</p>
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
                        <div className="free-perk1">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Can Create an Account
                          </Typography>
                        </div>
                        <div className="free-perk2">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Access Base App
                          </Typography>
                        </div>
                        <div className="free-perk3">
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            Change Data Filters
                          </Typography>
                        </div>
                      </CardContent>
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
export default DashAccountAdmin;
